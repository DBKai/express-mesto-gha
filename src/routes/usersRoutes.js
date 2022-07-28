const express = require('express');
const userControllers = require('../controllers/usersControllers');

const userRouters = express.Router();

userRouters.get('/', userControllers.getUsers);
userRouters.get('/:userId', userControllers.getUserById);
userRouters.post('/', userControllers.createUser);
userRouters.patch('/me', userControllers.updateUser);
userRouters.patch('/me/avatar', userControllers.updateAvatar);

module.exports = {
  userRouters,
};
