const { User } = require('../models/User');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { verifyAccessToken } = require('../utils/token');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Not authorized. Access token is missing.', 401);
  }

  const token = authHeader.split(' ')[1];

  let payload;

  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new AppError('Invalid or expired access token.', 401);
  }

  const user = await User.findById(payload.sub).select('-refreshTokens');

  if (!user) {
    throw new AppError('User no longer exists.', 401);
  }

  req.user = user;
  next();
});

module.exports = { protect };
