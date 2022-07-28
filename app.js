require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { userRouters } = require('./src/routes/userRoutes');
const { cardsRouters } = require('./src/routes/cardsRoutes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '62e29f5276f0b7d7e14b9c72',
  };
  next();
});

app.use('/users', userRouters);
app.use('/cards', cardsRouters);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
