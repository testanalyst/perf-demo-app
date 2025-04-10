const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');
const logger = require('./utils/logger');
const apiV1Routes = require('./api/v1/routes');
const swaggerRoutes = require('./docs/swagger');
const { errorHandler, notFound } = require('./api/v1/middleware/error.middleware');

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors());

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  })
);

// API versioning routes
app.use('/api/v1', apiV1Routes);

// Swagger documentation
app.use('/api-docs', swaggerRoutes);

// Basic redirect to API docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

module.exports = app; 