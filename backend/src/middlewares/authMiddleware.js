const { User } = require('../models/User');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { verifyAccessToken } = require('../utils/token');
const mongoose = require('mongoose');

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

  const dbConnected = mongoose.connection.readyState === 1;
  let user = null;

  if (dbConnected) {
    try {
      user = await User.findById(payload.sub).select('-refreshTokens');
    } catch {
      user = null;
    }
  }

  if (!user && payload.excelProfile) {
    user = {
      _id: payload.sub,
      id: payload.sub,
      fullName: payload.fullName,
      email: payload.email,
      role: payload.role,
      classCode: payload.classCode || '',
      classId: payload.classId || '',
      course: payload.course || payload.classCode || '',
      excelProfile: true
    };
  }

  if (!user) {
    throw new AppError('User no longer exists.', 401);
  }

  req.user = user;
  next();
});

module.exports = { protect };
