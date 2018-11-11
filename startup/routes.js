const express = require('express');
const cors = require('cors');
const config = require('config');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const helmet = require('helmet');
const compression = require('compression');

module.exports = function(app) {
  const corsOptions = {
    exposedHeaders: 'x-auth-token'
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.static(config.get('staticPath')));
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
  if (config.get('env') === 'production') {
    app.use(helmet());
    app.use(compression());
  }
};
