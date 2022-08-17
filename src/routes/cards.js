const express = require('express');
const cardsController = require('../controllers/cards');
const {
  createCardValidation, deleteCardValidation, likeCardValidation, dislikeCardValidation,
} = require('../middlewares/validation');

const cardRouters = express.Router();

cardRouters.get('/', cardsController.getCards);
cardRouters.post('/', createCardValidation, cardsController.createCard);
cardRouters.delete('/:cardId', deleteCardValidation, cardsController.deleteCard);
cardRouters.put('/:cardId/likes', likeCardValidation, cardsController.likeCard);
cardRouters.delete('/:cardId/likes', dislikeCardValidation, cardsController.dislikeCard);

module.exports = {
  cardRouters,
};
