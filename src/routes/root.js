const express = require('express');
const rootControllers = require('../controllers/root');

const rootRouters = express.Router();

rootRouters.post('/signup', rootControllers.createUser);
rootRouters.post('/signin', rootControllers.login);
rootRouters.use('*', rootControllers.useWrongPath);

module.exports = {
  rootRouters,
};
