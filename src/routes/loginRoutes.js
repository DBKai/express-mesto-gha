const express = require('express');
const loginControllers = require('../controllers/loginControllers');

const loginRouters = express.Router();

loginRouters.post('/', loginControllers.login);

module.exports = {
  loginRouters,
};
