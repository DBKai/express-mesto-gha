const { User } = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const IncorrectDataError = require('../errors/incorrect-data-error');

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.send(user);
    }
    throw new NotFoundError('Пользователь по указанному _id не найден.');
  } catch (err) {
    return next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    return res.send(users);
  } catch (err) {
    return next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      return res.send(user);
    }
    throw new NotFoundError('Пользователь по указанному _id не найден.');
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new IncorrectDataError('Передан некорректный _id пользователя.'));
    }
    return next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (user) {
      return res.send(user);
    }
    throw new NotFoundError('Пользователь с указанным _id не найден.');
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданы некорректные данные при обновлении профиля.'));
    }
    return next(err);
  }
};

exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (user) {
      return res.send(user);
    }
    throw new NotFoundError('Пользователь с указанным _id не найден.');
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданы некорректные данные при обновлении аватара.'));
    }
    return next(err);
  }
};
