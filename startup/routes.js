const express = require('express');
const config = require('config');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.static(config.get('staticPath')));
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
};
