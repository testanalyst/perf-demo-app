// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.PORT = 3000;
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = 5432;
process.env.DB_USER = 'postgres';
process.env.DB_PASSWORD = 'postgres';
process.env.DB_NAME = 'jmloadtestdb';
process.env.JWT_SECRET = 'test_jwt_secret';
process.env.JWT_EXPIRES_IN = '1h';
process.env.LOG_LEVEL = 'error';

// Silence console logs during tests
jest.mock('../utils/logger', () => ({
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  http: jest.fn(),
  debug: jest.fn(),
})); 