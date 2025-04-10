const userService = require('../../api/v1/services/user.service');
const userModel = require('../../api/v1/models/user.model');

// Mock the user model
jest.mock('../../api/v1/models/user.model');

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      // Mock data
      const mockUsers = [
        { id: 1, username: 'user1', email: 'user1@example.com' },
        { id: 2, username: 'user2', email: 'user2@example.com' }
      ];
      
      // Mock implementation
      userModel.findAll.mockResolvedValue(mockUsers);
      
      // Execute
      const result = await userService.getAllUsers();
      
      // Assert
      expect(result).toEqual(mockUsers);
      expect(userModel.findAll).toHaveBeenCalledTimes(1);
    });
    
    it('should throw an error if database fails', async () => {
      // Mock implementation
      const mockError = new Error('Database error');
      userModel.findAll.mockRejectedValue(mockError);
      
      // Execute & Assert
      await expect(userService.getAllUsers()).rejects.toThrow('Database error');
      expect(userModel.findAll).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('getUserById', () => {
    it('should return user by id', async () => {
      // Mock data
      const mockUser = { id: 1, username: 'user1', email: 'user1@example.com' };
      
      // Mock implementation
      userModel.findById.mockResolvedValue(mockUser);
      
      // Execute
      const result = await userService.getUserById(1);
      
      // Assert
      expect(result).toEqual(mockUser);
      expect(userModel.findById).toHaveBeenCalledWith(1);
    });
    
    it('should throw 404 error if user not found', async () => {
      // Mock implementation
      userModel.findById.mockResolvedValue(null);
      
      // Execute & Assert
      try {
        await userService.getUserById(999);
        fail('Expected error was not thrown');
      } catch (error) {
        expect(error.message).toBe('User not found');
        expect(error.statusCode).toBe(404);
      }
      
      expect(userModel.findById).toHaveBeenCalledWith(999);
    });
  });
  
  // Additional tests would be added for createUser, updateUser, and deleteUser
}); 