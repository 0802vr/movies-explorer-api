require('dotenv').config();

const {
  PORT, JWT_SECRET, MONGOOSE_DB, NODE_ENV,
} = process.env;

const ENV_PORT = PORT || 3000;
const JWT_KEY = (NODE_ENV === 'production') ? JWT_SECRET : 'dev-secret';
const MONGO_URL = MONGOOSE_DB || 'mongodb://localhost:27017/moviesdb';

module.exports = {
  ENV_PORT, JWT_KEY, MONGO_URL,
};
