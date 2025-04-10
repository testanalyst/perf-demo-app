const logger = require('../../../utils/logger');

/**
 * Error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error('Error caught by middleware', { 
    error: err.message, 
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Default status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Customize error response based on status code
  const errorResponse = {
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  };

  // Add more details for validation errors
  if (err.errors) {
    errorResponse.error.details = err.errors;
  }

  // Send appropriate status code and error response
  res.status(statusCode).json(errorResponse);
};

/**
 * Not found middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const notFound = (req, res) => {
  logger.warn('Route not found', { path: req.path, method: req.method });
  
  res.status(404).json({
    success: false,
    error: {
      message: `Route not found - ${req.originalUrl}`
    }
  });
};

module.exports = {
  errorHandler,
  notFound
}; 