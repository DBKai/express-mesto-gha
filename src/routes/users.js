const express = require('express');
const usersController = require('../controllers/users');
const { updateUserValidation, getUserByIdValidation, updateAvatarValidation } = require('../middlewares/validation');

const userRouters = express.Router();

userRouters.get('/', usersController.getUsers);
userRouters.get('/me', usersController.getCurrentUser);
userRouters.patch('/me', updateUserValidation, usersController.updateUser);
userRouters.get('/:userId', getUserByIdValidation, usersController.getUserById);
userRouters.patch('/me/avatar', updateAvatarValidation, usersController.updateAvatar);

module.exports = {
  userRouters,
};
