const Card = require('../models/cardModels');

exports.getCards = async (req, res) => {
  const cards = await Card.find({});

  res.send(cards);
};

exports.createCard = async (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  const card = await Card.create({ name, link, owner });

  res.send(card);
};

exports.deleteCard = async (req, res) => {
  const card = await Card.deleteOne({ id: req.params.cardId });

  res.send(card);
};

exports.likeCard = async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  );

  res.send(card);
};

exports.dislikeCard = async (req, res) => {
  const card = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  );

  res.send(card);
};
