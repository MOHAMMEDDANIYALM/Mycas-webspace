const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateAccessToken = (user) => {
  const sub =
    user?._id?.toString?.() ||
    user?.id ||
    user?.email;

  return jwt.sign(
    {
      sub,
      role: user.role,
      email: user.email,
      fullName: user.fullName || '',
      classCode: user.classCode || '',
      classId: user.classId || '',
      course: user.course || '',
      excelProfile: Boolean(user.excelProfile)
    },
    env.accessTokenSecret,
    { expiresIn: env.accessTokenExpiresIn }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      type: 'refresh'
    },
    env.refreshTokenSecret,
    { expiresIn: env.refreshTokenExpiresIn }
  );
};

const verifyAccessToken = (token) => jwt.verify(token, env.accessTokenSecret);
const verifyRefreshToken = (token) => jwt.verify(token, env.refreshTokenSecret);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
