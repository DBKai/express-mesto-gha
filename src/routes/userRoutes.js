const express = require('express');
const userControllers = require('../controller/userControllers');

const userRouters = express.Router();

userRouters.get('/', userControllers.getUsers);
userRouters.get('/:userId', userControllers.getUserById);
userRouters.post('/', userControllers.createUser);

module.exports = {
  userRouters,
};
