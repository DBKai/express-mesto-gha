const { User } = require('../models/userModels');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
    }
    res.status(500).send({ message: err.message });
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
      res.send(user);
    } else {
      res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
    }
    res.status(500).send({ message: err.message });
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
      res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
    }
    res.status(500).send({ message: err.message });
  }
};
