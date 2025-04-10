const db = require('../../../db/connection');
const logger = require('../../../utils/logger');

class UserModel {
  /**
   * Get all users
   * @returns {Promise<Array>} Array of users
   */
  async findAll() {
    try {
      const result = await db.query(
        'SELECT id, username, email, first_name, last_name, created_at, updated_at FROM users ORDER BY id ASC'
      );
      return result.rows;
    } catch (error) {
      logger.error('Error finding all users', { error: error.message });
      throw error;
    }
  }

  /**
   * Get user by id
   * @param {number} id - User id
   * @returns {Promise<Object>} User object
   */
  async findById(id) {
    try {
      const result = await db.query(
        'SELECT id, username, email, first_name, last_name, created_at, updated_at FROM users WHERE id = $1',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error finding user by ID', { error: error.message, userId: id });
      throw error;
    }
  }

  /**
   * Create a new user
   * @param {Object} user - User object
   * @returns {Promise<Object>} Created user
   */
  async create(user) {
    try {
      const { username, email, password, first_name, last_name } = user;
      const result = await db.query(
        'INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, first_name, last_name, created_at, updated_at',
        [username, email, password, first_name, last_name]
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating user', { error: error.message });
      throw error;
    }
  }

  /**
   * Update user by id
   * @param {number} id - User id
   * @param {Object} user - User object with updated fields
   * @returns {Promise<Object>} Updated user
   */
  async update(id, user) {
    try {
      const { username, email, password, first_name, last_name } = user;
      
      // Create dynamic query based on provided fields
      let query = 'UPDATE users SET updated_at = CURRENT_TIMESTAMP';
      const values = [];
      let paramIndex = 1;
      
      if (username) {
        query += `, username = $${paramIndex}`;
        values.push(username);
        paramIndex++;
      }
      
      if (email) {
        query += `, email = $${paramIndex}`;
        values.push(email);
        paramIndex++;
      }
      
      if (password) {
        query += `, password = $${paramIndex}`;
        values.push(password);
        paramIndex++;
      }
      
      if (first_name) {
        query += `, first_name = $${paramIndex}`;
        values.push(first_name);
        paramIndex++;
      }
      
      if (last_name) {
        query += `, last_name = $${paramIndex}`;
        values.push(last_name);
        paramIndex++;
      }
      
      query += ` WHERE id = $${paramIndex} RETURNING id, username, email, first_name, last_name, created_at, updated_at`;
      values.push(id);
      
      const result = await db.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error updating user', { error: error.message, userId: id });
      throw error;
    }
  }

  /**
   * Delete user by id
   * @param {number} id - User id
   * @returns {Promise<boolean>} True if user was deleted
   */
  async delete(id) {
    try {
      const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
      return result.rowCount > 0;
    } catch (error) {
      logger.error('Error deleting user', { error: error.message, userId: id });
      throw error;
    }
  }
}

module.exports = new UserModel(); 