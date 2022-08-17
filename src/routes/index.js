const express = require('express');
const { userRouters } = require('./users');
const { cardRouters } = require('./cards');
const { auth } = require('../middlewares/auth');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-error');
const usersController = require('../controllers/users');

const indexRouters = express.Router();

indexRouters.use('/users', auth, userRouters);
indexRouters.use('/cards', auth, cardRouters);
indexRouters.post('/signup', createUserValidation, usersController.createUser);
indexRouters.post('/signin', loginValidation, usersController.login);
indexRouters.use('*', auth, () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = {
  indexRouters,
};
