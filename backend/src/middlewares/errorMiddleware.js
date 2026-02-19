const env = require('../config/env');
const AppError = require('../utils/AppError');

const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';

  if (env.nodeEnv !== 'production') {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.nodeEnv !== 'production' && { stack: error.stack })
  });
};

module.exports = {
  notFound,
  errorHandler
};
