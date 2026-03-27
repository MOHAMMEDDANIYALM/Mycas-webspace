const app = require('./app');
const env = require('./config/env');
const connectDb = require('./config/db');

const startServer = async () => {
  try {
    let dbConnected = false;

    try {
      await connectDb();
      dbConnected = true;
    } catch (dbError) {
      console.error('Database connection failed. Continuing in degraded mode:', dbError.message);
    }

    const server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
      if (!dbConnected) {
        console.warn('Server is running without database connectivity. Excel-only auth fallback is active.');
      }
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Shutting down gracefully...`);
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection:', reason);
  process.exit(1);
});

startServer();
