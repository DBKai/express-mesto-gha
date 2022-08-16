const express = require('express');
const { celebrate, Joi } = require('celebrate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userRouters } = require('./users');
const { cardRouters } = require('./cards');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const IncorrectDataError = require('../errors/incorrect-data-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const DuplicateKeyError = require('../errors/duplicate-key-error');
const { User } = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const indexRouters = express.Router();
const app = express();

const createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });

    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданы некорректные данные при создании пользователя.'));
    }
    if (err.code === 11000) {
      return next(new DuplicateKeyError(`Пользователь с email ${err.keyValue.email} уже существует`));
    }
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    return res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true }).end();
  } catch (err) {
    return next(err);
  }
};

app.use('/users', auth, userRouters);
app.use('/cards', auth, cardRouters);

indexRouters.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    /* eslint no-useless-escape: 0 */
    avatar: Joi.string().pattern(/^http(s)?:\/\/(www\.)?([\w\-]+)?(\.[\w]+)(\/)?([\/\w\-.+[\]()_~:\/%?#@!$&'*,;=]*)$/),
  }).unknown(true),
}), createUser);
indexRouters.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), login);
indexRouters.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = {
  indexRouters,
};
