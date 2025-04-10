const app = require('./app');
const config = require('./config/config');
const logger = require('./utils/logger');
const { initializeDb } = require('./db/init');

// Unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection', { error: err.message, stack: err.stack });
  process.exit(1);
});

// Uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', { error: err.message, stack: err.stack });
  process.exit(1);
});

// Start the server
const startServer = async () => {
  try {
    // Initialize database
    await initializeDb();
    
    // Start the server
    const server = app.listen(config.port, () => {
      logger.info(`Server running in ${config.env} mode on port ${config.port}`);
      logger.info(`API Documentation available at http://localhost:${config.port}/api-docs`);
    });
    
    // Handle server shutdown gracefully
    const shutdownGracefully = () => {
      logger.info('Shutting down gracefully...');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
      
      // Force close after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };
    
    // Handle termination signals
    process.on('SIGTERM', shutdownGracefully);
    process.on('SIGINT', shutdownGracefully);
    
  } catch (error) {
    logger.error('Failed to start server', { error: error.message, stack: error.stack });
    process.exit(1);
  }
};

startServer(); 