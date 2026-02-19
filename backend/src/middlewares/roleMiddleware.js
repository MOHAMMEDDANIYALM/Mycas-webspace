const AppError = require('../utils/AppError');

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new AppError('Forbidden. You do not have permission.', 403);
    }

    next();
  };
};

module.exports = { authorizeRoles };
