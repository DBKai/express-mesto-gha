require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { userRouters } = require('./src/routes/usersRoutes');
const { cardsRouters } = require('./src/routes/cardsRoutes');
const { rootRouters } = require('./src/routes/rootRoutes');
const { loginRouters } = require('./src/routes/loginRoutes');
const { createUserRouters } = require('./src/routes/createUserRoutes');
const { auth } = require('./src/middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use('/users', auth, userRouters);
app.use('/cards', auth, cardsRouters);
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
