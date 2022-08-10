const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModels');
const { SERVER_ERROR, UNAUTHORIZED } = require('../utils/statusCode');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(UNAUTHORIZED).send({ message: 'Неправильные почта или пароль' });
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res.status(UNAUTHORIZED).send({ message: 'Неправильные почта или пароль' });
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );

    return res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true }).end();
  } catch (err) {
    return res.status(SERVER_ERROR).send({ message: err.message });
  }
};
