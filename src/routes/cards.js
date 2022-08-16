const express = require('express');
const cardsControllers = require('../controllers/cards');

const cardsRouters = express.Router();

cardsRouters.get('/', cardsControllers.getCards);
cardsRouters.post('/', cardsControllers.createCard);
cardsRouters.delete('/:cardId', cardsControllers.deleteCard);
cardsRouters.put('/:cardId/likes', cardsControllers.likeCard);
cardsRouters.delete('/:cardId/likes', cardsControllers.dislikeCard);

module.exports = {
  cardsRouters,
};
