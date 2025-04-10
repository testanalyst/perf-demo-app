const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const logger = require('../utils/logger');

// Load the OpenAPI specification
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Create a router for Swagger
const router = express.Router();

// Serve Swagger UI
router.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  })
);

logger.info('Swagger UI initialized');

module.exports = router; 