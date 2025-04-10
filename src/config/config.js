require('dotenv').config();

// Parse DATABASE_URL if provided (Railway format)
let dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'users_api_db',
};

// If running on Railway or other PaaS, they provide DATABASE_URL
if (process.env.DATABASE_URL) {
  // We don't need to parse it as the pg module handles connection strings directly
  dbConfig = {
    connectionString: process.env.DATABASE_URL,
    // Add SSL settings for production environments if needed
    ...(process.env.NODE_ENV === 'production' && {
      ssl: {
        rejectUnauthorized: false // Required by some providers
      }
    })
  };
}

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: dbConfig,
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  logLevel: process.env.LOG_LEVEL || 'info',
};

module.exports = config; 