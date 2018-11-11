const config = require('config');
const winston = require('winston');
const express = require('express');
const app = express();
const routes = require('./startup/routes');
const logging = require('./startup/logging');
const dateBase = require('./startup/database');

//startup
logging();
dateBase();
routes(app);

const port = config.get('PORT');
const server = app.listen(port, () => {
  winston.info(`app is listening @port${port} ...`);
});

module.exports = server;
