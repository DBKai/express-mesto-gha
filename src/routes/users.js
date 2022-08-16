const express = require('express');
const { celebrate, Joi } = require('celebrate');
const usersController = require('../controllers/users');

const userRouters = express.Router();

userRouters.get('/', usersController.getUsers);
userRouters.get('/me', usersController.getCurrentUser);
userRouters.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), usersController.updateUser);
userRouters.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), usersController.getUserById);
userRouters.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    /* eslint no-useless-escape: 0 */
    avatar: Joi.string().pattern(/^http(s)?:\/\/(www\.)?([\w\-]+)?(\.[\w]+)(\/)?([\/\w\-.+[\]()_~:\/%?#@!$&'*,;=]*)$/),
  }).unknown(true),
}), usersController.updateAvatar);

module.exports = {
  userRouters,
};
