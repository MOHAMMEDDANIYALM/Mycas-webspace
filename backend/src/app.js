const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const env = require('./config/env');
const authRoutes = require('./routes/authRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const emailRoutes = require('./routes/emailRoutes');
const emailManagementRoutes = require('./routes/emailManagementRoutes');
const emailDirectoryRoutes = require('./routes/emailDirectoryRoutes');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

const app = express();

app.set('trust proxy', 1);

const safeHostname = (origin) => {
  try {
    return new URL(origin).hostname.toLowerCase();
  } catch {
    return '';
  }
};

const wildcardHostMatches = (hostname, pattern) => {
  if (!pattern.startsWith('*.')) {
    return false;
  }

  const suffix = pattern.slice(1).toLowerCase();
  return hostname.endsWith(suffix);
};

const isOriginAllowed = (origin) => {
  if (!origin) {
    return true;
  }

  const normalizedOrigin = origin.toLowerCase();
  const configured = env.corsAllowedOrigins || [];

  if (configured.includes('*') || configured.includes(normalizedOrigin)) {
    return true;
  }

  const hostname = safeHostname(origin);

  // Deployment-friendly defaults to avoid false CORS blocks.
  const trustedHostPatterns = ['localhost', '127.0.0.1', '*.azurewebsites.net', '*.azurestaticapps.net', '*.vercel.app'];

  if (trustedHostPatterns.includes(hostname)) {
    return true;
  }

  return trustedHostPatterns.some((pattern) => wildcardHostMatches(hostname, pattern));
};

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (isOriginAllowed(origin)) {
        return callback(null, true);
      }

      return callback(new Error('CORS origin not allowed'));
    },
    credentials: true
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again later.'
  })
);

if (env.nodeEnv !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    service: 'CollegeHub API',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/timetable', timetableRoutes);
app.use('/api/v1/email', emailRoutes);
app.use('/api/v1/email-management', emailManagementRoutes);
app.use('/api/v1/email-directory', emailDirectoryRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
