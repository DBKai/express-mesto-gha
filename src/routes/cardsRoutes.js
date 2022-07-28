const express = require('express');
const cardsControllers = require('../controller/cardsControllers');

const cardsRouters = express.Router();

cardsRouters.get('/', cardsControllers.getCards);
cardsRouters.post('/', cardsControllers.createCard);
cardsRouters.delete('/:cardId', cardsControllers.deleteCard);

module.exports = {
  cardsRouters,
};
