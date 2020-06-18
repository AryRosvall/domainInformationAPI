const express = require('express');
const cors = require('cors');
const Routes = require('./api/routes');
const config = require('./config');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

Routes(app);

app.get('/', (req, res, next) => {
  try {
    res.status(200)
      .send({
        'api': 'Domain Info',
        'version': '1.0.0',
      });

  } catch (error) {
    next(error);
  }
});

app.use(notFoundMiddleware);

const server = app.listen(config.server.port, () => {
  console.log(`Server is listening at ${config.server.host}:${server.address().port}`);
});

module.exports = server;
