const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const IncorrectDataError = require('../errors/incorrect-data-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const DuplicateKeyError = require('../errors/duplicate-key-error');
const { User } = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.useWrongPath = async (req, res, next) => {
  try {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  } catch (err) {
    return next(err);
  }
};

exports.createUser = async (req, res, next) => {
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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

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
