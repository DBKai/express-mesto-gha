const bcrypt = require('bcryptjs');
const { User } = require('../models/userModels');
const { INCORRECT_DATA, NOT_FOUND, SERVER_ERROR } = require('../utils/statusCode');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    return res.send(users);
  } catch (err) {
    return res.status(SERVER_ERROR).send({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      return res.send(user);
    }
    return res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(INCORRECT_DATA).send({ message: 'Передан некорректный _id пользователя.' });
    }
    return res.status(SERVER_ERROR).send({ message: err.message, name: err.name });
  }
};

exports.createUser = async (req, res) => {
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
      return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные при создании пользователя.' });
    }
    return res.status(SERVER_ERROR).send({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
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
    return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
    }
    return res.status(SERVER_ERROR).send({ message: err.message });
  }
};

exports.updateAvatar = async (req, res) => {
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
    return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
    }
    return res.status(SERVER_ERROR).send({ message: err.message });
  }
};
