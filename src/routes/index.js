const express = require('express');
const { userRouters } = require('./userRoutes');

const routes = express.Router();

routes.use('/users', userRouters);

module.exports = {
  routes,
};
