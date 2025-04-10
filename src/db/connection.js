const { Pool } = require('pg');
const config = require('../config/config');
const logger = require('../utils/logger');

// Create a single connection pool that will be reused across the application
const pool = process.env.DATABASE_URL 
  ? new Pool({ 
      connectionString: process.env.DATABASE_URL,
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000 // Close idle clients after 30 seconds
    })
  : new Pool({
      user: config.db.user,
      host: config.db.host,
      database: config.db.database,
      password: config.db.password,
      port: config.db.port,
      max: 20,
      idleTimeoutMillis: 30000
    });

// Log pool events
pool.on('connect', () => {
  // Only log this once when the pool is created, not on every connection
  if (!global.poolConnected) {
    logger.info('PostgreSQL connection pool established');
    global.poolConnected = true;
  }
});

pool.on('error', (err) => {
  logger.error('PostgreSQL connection error', { error: err.message });
});

// Log pool statistics periodically
setInterval(() => {
  const stats = {
    total: pool.totalCount,
    idle: pool.idleCount,
    waiting: pool.waitingCount,
  };
  logger.debug('PostgreSQL connection pool stats', stats);
}, 60000);

module.exports = {
  query: (text, params) => {
    logger.debug('Executing query', { query: text });
    return pool.query(text, params);
  },
  getPool: () => pool,
}; 