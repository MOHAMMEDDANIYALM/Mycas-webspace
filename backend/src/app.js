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
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.frontendOrigin,
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
  res.status(200).json({ success: true, message: 'CollegeHub API is running.' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/timetable', timetableRoutes);
app.use('/api/email', emailRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
