const express = require('express');
const createUserControllers = require('../controllers/createUserControllers');

const createUserRouters = express.Router();

createUserRouters.post('/', createUserControllers.createUser);

module.exports = {
  createUserRouters,
};
