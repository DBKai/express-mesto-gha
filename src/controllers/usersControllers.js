const { User } = require('../models/userModels');

exports.getUsers = async (req, res) => {
  const users = await User.find({});

  res.send(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);

  res.send(user);
};

exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  const user = await User.create({ name, about, avatar });

  res.send(user);
};

exports.updateUser = async (req, res) => {
  const { name, about } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, { name, about });

  res.send(user);
};

exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, { avatar });

  res.send(user);
};
