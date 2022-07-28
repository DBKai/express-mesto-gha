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
