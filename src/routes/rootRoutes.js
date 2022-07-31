const express = require('express');
const rootControllers = require('../controllers/rootControllers');

const rootRouters = express.Router();

rootRouters.use('*', rootControllers.useWrongPath);

module.exports = {
  rootRouters,
};
