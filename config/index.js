const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  server: {
    host: process.env.HOST,
    env: process.env.ENV,
    port: process.env.PORT,
  },
  api: {
    version: process.env.API_VERSION,
  },
  mongo: {
    host: process.env.MONGO_HOST,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    database: process.env.MONGO_DB,
    mongo_uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  },
};
