const express = require('express');
const rootControllers = require('../controllers/rootControllers');

const rootRouters = express.Router();

rootRouters.get('*', rootControllers.getRoot);

module.exports = {
  rootRouters,
};
