const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

/**
 * @route GET /api/v1/users
 * @desc Get all users
 * @access Public (will be protected in the future)
 */
router.get('/', userController.getAllUsers);

/**
 * @route GET /api/v1/users/:id
 * @desc Get user by id
 * @access Public (will be protected in the future)
 */
router.get('/:id', userController.getUserById);

/**
 * @route POST /api/v1/users
 * @desc Create a new user
 * @access Public (will be protected in the future)
 */
router.post('/', userController.createUser);

/**
 * @route PUT /api/v1/users/:id
 * @desc Update user by id
 * @access Public (will be protected in the future)
 */
router.put('/:id', userController.updateUser);

/**
 * @route DELETE /api/v1/users/:id
 * @desc Delete user by id
 * @access Public (will be protected in the future)
 */
router.delete('/:id', userController.deleteUser);

module.exports = router; 