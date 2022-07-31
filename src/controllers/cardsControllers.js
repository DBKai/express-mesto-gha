const Card = require('../models/cardModels');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.createCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });

    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
    }
    res.status(500).send({ message: err.message });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.deleteOne({ _id: req.params.cardId });
    if (card.deletedCount > 0) {
      res.send(card);
    } else {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (card) {
      res.send(card);
    } else {
      res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' });
    }
    res.status(500).send({ message: err.message });
  }
};

exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (card) {
      res.send(card);
    } else {
      res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные для снятии лайка.' });
    }
    res.status(500).send({ message: err.message });
  }
};
