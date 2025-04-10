const { Pool } = require('pg');
const config = require('../config/config');
const logger = require('../utils/logger');

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

// Test the connection
pool.on('connect', () => {
  logger.info('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  logger.error('PostgreSQL connection error', { error: err.message });
});

module.exports = {
  query: (text, params) => {
    logger.debug('Executing query', { query: text });
    return pool.query(text, params);
  },
  getPool: () => pool,
}; 