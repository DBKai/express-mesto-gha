const express = require('express');
const userControllers = require('../controllers/usersControllers');

const userRouters = express.Router();

userRouters.get('/', userControllers.getUsers);
userRouters.get('/me', userControllers.getCurrentUser);
userRouters.get('/:userId', userControllers.getUserById);
userRouters.patch('/me', userControllers.updateUser);
userRouters.patch('/me/avatar', userControllers.updateAvatar);

module.exports = {
  userRouters,
};
