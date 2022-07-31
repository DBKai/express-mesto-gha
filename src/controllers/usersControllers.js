const { User } = require('../models/userModels');
const { INCORRECT_DATA, NOT_FOUND, SERVER_ERROR } = require('../utils/statusCode');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    res.status(SERVER_ERROR).send({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.send(user);
    } else {
      res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(INCORRECT_DATA).send({ message: 'Передан некорректный _id пользователя.' });
    }
    res.status(SERVER_ERROR).send({ message: err.message, name: err.name });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные при создании пользователя.' });
    }
    res.status(SERVER_ERROR).send({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true },
    );
    if (user) {
      const validation = user.validateSync();
      if (validation !== undefined) {
        return res.status(INCORRECT_DATA).send({ message: validation.message });
      }
      res.send(user);
    } else {
      res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
    }
    res.status(SERVER_ERROR).send({ message: err.message });
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    );
    if (user) {
      res.send(user);
    } else {
      res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
    }
    res.status(SERVER_ERROR).send({ message: err.message });
  }
};
