const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { User, ROLES } = require('../models/User');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/token');

const cookieOptions = {
  httpOnly: true,
  secure: env.cookieSecure,
  sameSite: 'lax',
  path: '/api/v1/auth/refresh'
};

const parseRefreshTokenExpiryMs = () => {
  const value = env.refreshTokenExpiresIn;

  if (value.endsWith('d')) {
    return Number(value.replace('d', '')) * 24 * 60 * 60 * 1000;
  }

  if (value.endsWith('h')) {
    return Number(value.replace('h', '')) * 60 * 60 * 1000;
  }

  return 14 * 24 * 60 * 60 * 1000;
};

const setRefreshCookie = (res, refreshToken) => {
  res.cookie(env.cookieName, refreshToken, {
    ...cookieOptions,
    maxAge: parseRefreshTokenExpiryMs()
  });
};

const clearRefreshCookie = (res) => {
  res.clearCookie(env.cookieName, cookieOptions);
};

const sanitizeUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  classCode: user.classCode || '',
  classId: user.classId || ''
});

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, role, classCode, classId } = req.body;

  if (!fullName || !email || !password) {
    throw new AppError('fullName, email and password are required.', 400);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new AppError('Email is already registered.', 409);
  }

  const selectedRole = role && ROLES.includes(role) ? role : 'student';

  const normalizedClassId = classId
    ? classId.trim().toUpperCase()
    : classCode
      ? classCode.trim().toUpperCase()
      : '';

  const user = await User.create({
    fullName,
    email: normalizedEmail,
    password,
    role: selectedRole,
    classCode: classCode ? classCode.trim().toUpperCase() : normalizedClassId,
    classId: normalizedClassId
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const expiresAt = new Date(Date.now() + parseRefreshTokenExpiryMs());
  user.refreshTokens.push({ token: refreshToken, expiresAt });
  await user.save();

  setRefreshCookie(res, refreshToken);

  res.status(201).json({
    success: true,
    message: 'User registered successfully.',
    accessToken,
    user: sanitizeUser(user)
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('email and password are required.', 400);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!user) {
    throw new AppError('Invalid email or password.', 401);
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new AppError('Invalid email or password.', 401);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshTokens = user.refreshTokens.filter((entry) => entry.expiresAt > new Date());
  user.refreshTokens.push({
    token: refreshToken,
    expiresAt: new Date(Date.now() + parseRefreshTokenExpiryMs())
  });
  await user.save();

  setRefreshCookie(res, refreshToken);

  res.status(200).json({
    success: true,
    message: 'Login successful.',
    accessToken,
    user: sanitizeUser(user)
  });
});

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies[env.cookieName];

  if (!refreshToken) {
    throw new AppError('Refresh token is missing.', 401);
  }

  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new AppError('Invalid or expired refresh token.', 401);
  }

  if (payload.type !== 'refresh') {
    throw new AppError('Invalid token type.', 401);
  }

  const user = await User.findById(payload.sub);

  if (!user) {
    throw new AppError('User not found.', 401);
  }

  const matchedToken = user.refreshTokens.find((entry) => entry.token === refreshToken);

  if (!matchedToken || matchedToken.expiresAt < new Date()) {
    throw new AppError('Refresh token is revoked or expired.', 401);
  }

  user.refreshTokens = user.refreshTokens.filter((entry) => entry.token !== refreshToken);

  const rotatedRefreshToken = generateRefreshToken(user);
  user.refreshTokens.push({
    token: rotatedRefreshToken,
    expiresAt: new Date(Date.now() + parseRefreshTokenExpiryMs())
  });

  await user.save();

  const accessToken = generateAccessToken(user);
  setRefreshCookie(res, rotatedRefreshToken);

  res.status(200).json({
    success: true,
    message: 'Token refreshed successfully.',
    accessToken,
    user: sanitizeUser(user)
  });
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies[env.cookieName];

  if (refreshToken) {
    let payload;

    try {
      payload = jwt.verify(refreshToken, env.refreshTokenSecret);
    } catch (error) {
      payload = null;
    }

    if (payload?.sub) {
      await User.findByIdAndUpdate(payload.sub, {
        $pull: {
          refreshTokens: { token: refreshToken }
        }
      });
    }
  }

  clearRefreshCookie(res);

  res.status(200).json({
    success: true,
    message: 'Logout successful.'
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-refreshTokens');

  res.status(200).json({
    success: true,
    user: sanitizeUser(user)
  });
});

module.exports = {
  register,
  login,
  refresh,
  logout,
  me
};
