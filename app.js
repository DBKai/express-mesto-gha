require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { userRouters } = require('./src/routes/usersRoutes');
const { cardsRouters } = require('./src/routes/cardsRoutes');
const { rootRouters } = require('./src/routes/rootRoutes');
const { loginRouters } = require('./src/routes/loginRoutes');
const { createUserRouters } = require('./src/routes/createUserRoutes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62e29f5276f0b7d7e14b9c72',
  };
  next();
});

app.use('/users', userRouters);
app.use('/cards', cardsRouters);
app.use('/signin', loginRouters);
app.use('/signup', createUserRouters);
app.use('/', rootRouters);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });

  await app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

main();
