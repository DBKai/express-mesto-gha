const Card = require('../models/cardModels');
const { INCORRECT_DATA, NOT_FOUND, SERVER_ERROR } = require('../utils/statusCode');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    res.status(SERVER_ERROR).send({ message: err.message });
  }
};

exports.createCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });

    return res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные при создании карточки.' });
    }
    return res.status(SERVER_ERROR).send({ message: err.message });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.deleteOne({ _id: req.params.cardId });
    if (card.deletedCount > 0) {
      return res.send(card);
    }
    return res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена.' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные для удаления карточки.' });
    }
    return res.status(SERVER_ERROR).send({ message: err.message });
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
      return res.send(card);
    }
    return res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные для постановки лайка.' });
    }
    return res.status(SERVER_ERROR).send({ message: err.message });
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
      return res.send(card);
    }
    return res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные для снятии лайка.' });
    }
    return res.status(SERVER_ERROR).send({ message: err.message });
  }
};
