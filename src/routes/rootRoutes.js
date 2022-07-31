const express = require('express');
const rootControllers = require('../controllers/rootControllers');

const rootRouters = express.Router();

rootRouters.patch('*', rootControllers.pathWrongPath);

module.exports = {
  rootRouters,
};
