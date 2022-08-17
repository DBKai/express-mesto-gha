const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { userRouters } = require('./users');
const { cardRouters } = require('./cards');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const usersController = require('../controllers/users');

const indexRouters = express.Router();

indexRouters.use('/users', auth, userRouters);
indexRouters.use('/cards', auth, cardRouters);

indexRouters.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    /* eslint no-useless-escape: 0 */
    avatar: Joi.string().pattern(/^http(s)?:\/\/(www\.)?([\w\-]+)?(\.[\w]+)(\/)?([\/\w\-.+[\]()_~:\/%?#@!$&'*,;=]*)$/),
  }).unknown(true),
}), usersController.createUser);
indexRouters.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), usersController.login);
indexRouters.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = {
  indexRouters,
};
