const request = require('supertest');
const app = require('../../app');
const db = require('../../db/connection');

// Mock the database connection
jest.mock('../../db/connection');

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('GET /api/v1/users', () => {
    it('should return all users', async () => {
      // Mock data
      const mockUsers = [
        { id: 1, username: 'user1', email: 'user1@example.com' },
        { id: 2, username: 'user2', email: 'user2@example.com' }
      ];
      
      // Mock DB query response
      db.query.mockResolvedValue({ rows: mockUsers });
      
      // Execute request
      const response = await request(app).get('/api/v1/users');
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: 1, username: 'user1' }),
        expect.objectContaining({ id: 2, username: 'user2' })
      ]));
    });
    
    it('should handle errors', async () => {
      // Mock DB query error
      db.query.mockRejectedValue(new Error('Database error'));
      
      // Execute request
      const response = await request(app).get('/api/v1/users');
      
      // Assert
      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toHaveProperty('message');
    });
  });
  
  describe('GET /api/v1/users/:id', () => {
    it('should return user by id', async () => {
      // Mock data
      const mockUser = { id: 1, username: 'user1', email: 'user1@example.com' };
      
      // Mock DB query response
      db.query.mockResolvedValue({ rows: [mockUser] });
      
      // Execute request
      const response = await request(app).get('/api/v1/users/1');
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(expect.objectContaining({
        id: 1,
        username: 'user1'
      }));
    });
    
    it('should return 404 if user not found', async () => {
      // Mock DB query response for no results
      db.query.mockResolvedValue({ rows: [] });
      
      // Execute request
      const response = await request(app).get('/api/v1/users/999');
      
      // Assert
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('User not found');
    });
  });
  
  // Additional tests for POST, PUT, and DELETE would be added here
}); 