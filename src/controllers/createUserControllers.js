const bcrypt = require('bcryptjs');
const { INCORRECT_DATA, SERVER_ERROR } = require('../utils/statusCode');
const { User } = require('../models/userModels');

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
