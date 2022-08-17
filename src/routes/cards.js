const express = require('express');
const { celebrate, Joi } = require('celebrate');
const cardsController = require('../controllers/cards');

const cardRouters = express.Router();

cardRouters.get('/', cardsController.getCards);
cardRouters.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    /* eslint no-useless-escape: 0 */
    link: Joi.string().required().pattern(/^http(s)?:\/\/(www\.)?([\w\-]+)?(\.[\w]+)(\/)?([\/\w\-.+[\]()_~:\/%?#@!$&'*,;=]*)$/),
  }).unknown(true),
}), cardsController.createCard);
cardRouters.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), cardsController.deleteCard);
cardRouters.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), cardsController.likeCard);
cardRouters.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), cardsController.dislikeCard);

module.exports = {
  cardRouters,
};
