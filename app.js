const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { ENV_PORT, MONGO_URL } = require('./utils/config');
const routers = require('./routers');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(express.json());
app.use(requestLogger);

app.use(helmet());

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', routers);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose.connect(MONGO_URL, () => {
  console.log('Монго запущена');
});
app.listen(ENV_PORT, () => {
  console.log(`Сервер ${ENV_PORT} работает`);
});
