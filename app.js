require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
