const NotFoundError = require('../errors/not-found-error');
const IncorrectDataError = require('../errors/incorrect-data-error');
const ForbiddenError = require('../errors/forbidden-error');
const Card = require('../models/card');

exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

exports.createCard = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });

    return res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданы некорректные данные при создании карточки.'));
    }

    return next(err);
  }
};

exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findOne({ _id: req.params.cardId });

    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    }
    const isOwner = card.owner.toString() === req.user._id;
    if (!isOwner) {
      throw new ForbiddenError('Нельзя удалить чужую карточку');
    }
    await Card.deleteOne({ _id: req.params.cardId });

    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new IncorrectDataError('Переданы некорректные данные для удаления карточки.'));
    }

    return next(err);
  }
};

exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (card) {
      return res.send(card);
    }
    throw new NotFoundError('Передан несуществующий _id карточки.');
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new IncorrectDataError('Переданы некорректные данные для постановки лайка.'));
    }

    return next(err);
  }
};

exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (card) {
      return res.send(card);
    }
    throw new NotFoundError('Передан несуществующий _id карточки.');
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new IncorrectDataError('Переданы некорректные данные для снятии лайка.'));
    }

    return next(err);
  }
};
