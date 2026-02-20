const dotenv = require('dotenv');

dotenv.config();

const requiredEnv = ['MONGODB_URI', 'ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET'];

const parseNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseBoolean = (value, fallback = false) => {
  if (value === undefined) {
    return fallback;
  }

  return value === 'true';
};

const parseCsv = (value) => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
};

const parseSameSite = (value) => {
  const normalized = (value || '').toLowerCase();

  if (['lax', 'strict', 'none'].includes(normalized)) {
    return normalized;
  }

  return 'lax';
};

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseNumber(process.env.PORT, 8080),
  mongodbUri: process.env.MONGODB_URI,
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  corsAllowedOrigins: parseCsv(process.env.CORS_ALLOWED_ORIGINS || process.env.FRONTEND_ORIGIN || 'http://localhost:3000'),
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '14d',
  cookieName: process.env.COOKIE_NAME || 'collegehub_rt',
  cookieSecure: parseBoolean(process.env.COOKIE_SECURE, process.env.NODE_ENV === 'production'),
  cookieSameSite: parseSameSite(process.env.COOKIE_SAME_SITE),
  maxRefreshSessionsPerUser: parseNumber(process.env.MAX_REFRESH_SESSIONS_PER_USER, 5),
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  emailFrom: process.env.EMAIL_FROM,
  sendgridMaxRetries: parseNumber(process.env.SENDGRID_MAX_RETRIES, 3),
  sendgridBaseBackoffMs: parseNumber(process.env.SENDGRID_BASE_BACKOFF_MS, 500),
  sendgridBatchDelayMs: parseNumber(process.env.SENDGRID_BATCH_DELAY_MS, 100)
};
