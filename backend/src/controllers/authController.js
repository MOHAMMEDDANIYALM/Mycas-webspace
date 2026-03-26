const env = require('../config/env');
const { User } = require('../models/User');
const { EmailDirectoryContact } = require('../models/EmailDirectoryContact');
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
  throw new AppError('Signup is disabled. Use email login only.', 410);
});

const login = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError('email is required.', 400);
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (!validateEmail(normalizedEmail)) {
    throw new AppError('A valid email is required.', 400);
  }

  const directoryContact = await EmailDirectoryContact.findOne({ email: normalizedEmail });

  if (!directoryContact) {
    throw new AppError('Email is not in the approved directory.', 403);
  }

  let user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    user = await User.create({
      fullName: directoryContact.fullName,
      email: normalizedEmail,
      role: directoryContact.role,
      classCode: directoryContact.classCode || '',
      classId: directoryContact.classCode || ''
    });
  } else {
    const privilegedRoles = ['promo_admin', 'super_admin'];
    user.fullName = directoryContact.fullName;
    user.classCode = directoryContact.classCode || '';
    user.classId = directoryContact.classCode || '';

    if (!privilegedRoles.includes(user.role)) {
      user.role = directoryContact.role;
    }

    await user.save();
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
