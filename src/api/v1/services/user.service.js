const userModel = require('../models/user.model');
const logger = require('../../../utils/logger');

class UserService {
  /**
   * Get all users
   * @returns {Promise<Array>} Array of users
   */
  async getAllUsers() {
    try {
      logger.info('Getting all users');
      return await userModel.findAll();
    } catch (error) {
      logger.error('Service error getting all users', { error: error.message });
      throw error;
    }
  }

  /**
   * Get user by id
   * @param {number} id - User id
   * @returns {Promise<Object>} User object
   */
  async getUserById(id) {
    try {
      logger.info('Getting user by ID', { userId: id });
      const user = await userModel.findById(id);
      
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      
      return user;
    } catch (error) {
      if (!error.statusCode) {
        logger.error('Service error getting user by ID', { error: error.message, userId: id });
      }
      throw error;
    }
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  async createUser(userData) {
    try {
      logger.info('Creating a new user');
      
      // Here we could add validation, password hashing, etc.
      // For a real implementation, never store plain text passwords
      
      return await userModel.create(userData);
    } catch (error) {
      logger.error('Service error creating user', { error: error.message });
      
      // Handle unique constraint violations
      if (error.code === '23505') { // PostgreSQL unique violation code
        const customError = new Error('Username or email already exists');
        customError.statusCode = 409;
        throw customError;
      }
      
      throw error;
    }
  }

  /**
   * Update user by id
   * @param {number} id - User id
   * @param {Object} userData - User data to update
   * @returns {Promise<Object>} Updated user
   */
  async updateUser(id, userData) {
    try {
      logger.info('Updating user', { userId: id });
      
      // Check if user exists
      const existingUser = await userModel.findById(id);
      if (!existingUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      
      // Here we could add validation, password hashing if password is being updated, etc.
      
      return await userModel.update(id, userData);
    } catch (error) {
      if (!error.statusCode) {
        logger.error('Service error updating user', { error: error.message, userId: id });
      }
      
      // Handle unique constraint violations
      if (error.code === '23505') {
        const customError = new Error('Username or email already exists');
        customError.statusCode = 409;
        throw customError;
      }
      
      throw error;
    }
  }

  /**
   * Delete user by id
   * @param {number} id - User id
   * @returns {Promise<boolean>} True if user was deleted
   */
  async deleteUser(id) {
    try {
      logger.info('Deleting user', { userId: id });
      
      // Check if user exists
      const existingUser = await userModel.findById(id);
      if (!existingUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      
      return await userModel.delete(id);
    } catch (error) {
      if (!error.statusCode) {
        logger.error('Service error deleting user', { error: error.message, userId: id });
      }
      throw error;
    }
  }
}

module.exports = new UserService(); 