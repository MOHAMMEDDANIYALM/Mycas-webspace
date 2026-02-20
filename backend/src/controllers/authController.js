const env = require('../config/env');
const { User } = require('../models/User');
const ApprovedEmail = require('../models/ApprovedEmail');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/token');
const { hashToken } = require('../utils/crypto');

const cookieOptions = {
  httpOnly: true,
  secure: env.cookieSecure,
  sameSite: env.cookieSameSite,
  path: '/api/v1/auth/refresh'
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => {
  return emailRegex.test(email);
};

const createRefreshTokenEntry = (rawToken) => ({
  tokenHash: hashToken(rawToken),
  expiresAt: new Date(Date.now() + parseRefreshTokenExpiryMs())
});

const findRefreshTokenEntry = (entries, rawToken) => {
  const hashed = hashToken(rawToken);
  return entries.find((entry) => entry.tokenHash === hashed || entry.token === rawToken);
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
  id: user._id.toString(),
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  classCode: user.classCode || '',
  classId: user.classId || ''
});

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new AppError('fullName, email, and password are required.', 400);
  }

  const normalizedFullName = fullName.trim();

  if (normalizedFullName.length < 2 || normalizedFullName.length > 100) {
    throw new AppError('fullName must be between 2 and 100 characters.', 400);
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (!validateEmail(normalizedEmail)) {
    throw new AppError('A valid email is required.', 400);
  }

  if (typeof password !== 'string' || password.length < 8) {
    throw new AppError('Password must be at least 8 characters.', 400);
  }

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new AppError('Email is already registered.', 409);
  }

  // Check if email is approved by a teacher for student registration
  const approvedEmail = await ApprovedEmail.findOne({ email: normalizedEmail });

  if (!approvedEmail) {
    throw new AppError(
      'This email has not been approved for registration. Contact your institution.',
      403
    );
  }

  if (approvedEmail.status === 'registered') {
    throw new AppError('This email has already been used to register.', 409);
  }

  const user = await User.create({
    fullName: normalizedFullName,
    email: normalizedEmail,
    password,
    role: 'student',
    classCode: approvedEmail.classCode,
    classId: approvedEmail.classCode
  });

  // Update approved email status to registered
  approvedEmail.status = 'registered';
  approvedEmail.registeredAt = new Date();
  await approvedEmail.save();

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshTokens = [createRefreshTokenEntry(refreshToken)];
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

  if (!validateEmail(normalizedEmail)) {
    throw new AppError('A valid email is required.', 400);
  }

  if (typeof password !== 'string' || !password) {
    throw new AppError('Password is required.', 400);
  }

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
  user.refreshTokens.push(createRefreshTokenEntry(refreshToken));

  if (user.refreshTokens.length > env.maxRefreshSessionsPerUser) {
    user.refreshTokens = user.refreshTokens
      .sort((a, b) => b.expiresAt - a.expiresAt)
      .slice(0, env.maxRefreshSessionsPerUser);
  }

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

  user.refreshTokens = user.refreshTokens.filter((entry) => entry.expiresAt > new Date());

  const matchedToken = findRefreshTokenEntry(user.refreshTokens, refreshToken);

  if (!matchedToken) {
    throw new AppError('Refresh token is revoked or expired.', 401);
  }

  const refreshTokenHash = hashToken(refreshToken);
  user.refreshTokens = user.refreshTokens.filter(
    (entry) => entry.tokenHash !== refreshTokenHash && entry.token !== refreshToken
  );

  const rotatedRefreshToken = generateRefreshToken(user);
  user.refreshTokens.push(createRefreshTokenEntry(rotatedRefreshToken));

  if (user.refreshTokens.length > env.maxRefreshSessionsPerUser) {
    user.refreshTokens = user.refreshTokens
      .sort((a, b) => b.expiresAt - a.expiresAt)
      .slice(0, env.maxRefreshSessionsPerUser);
  }

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
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      payload = null;
    }

    if (payload?.sub) {
      const refreshTokenHash = hashToken(refreshToken);
      await User.findByIdAndUpdate(payload.sub, {
        $pull: {
          refreshTokens: {
            $or: [{ tokenHash: refreshTokenHash }, { token: refreshToken }]
          }
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

  if (!user) {
    throw new AppError('User no longer exists.', 401);
  }

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
