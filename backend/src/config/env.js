const dotenv = require('dotenv');

dotenv.config();

const requiredEnv = ['MONGODB_URI', 'ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET'];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongodbUri: process.env.MONGODB_URI,
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '14d',
  cookieName: process.env.COOKIE_NAME || 'collegehub_rt',
  cookieSecure: process.env.COOKIE_SECURE === 'true',
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  emailFrom: process.env.EMAIL_FROM,
  sendgridMaxRetries: Number(process.env.SENDGRID_MAX_RETRIES) || 3,
  sendgridBaseBackoffMs: Number(process.env.SENDGRID_BASE_BACKOFF_MS) || 500
};
