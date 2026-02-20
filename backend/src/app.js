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
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

const app = express();

app.set('trust proxy', 1);

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (env.corsAllowedOrigins.includes(origin)) {
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

app.use(notFound);
app.use(errorHandler);

module.exports = app;
