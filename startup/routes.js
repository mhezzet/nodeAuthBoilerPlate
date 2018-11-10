const express = require('express');
const config = require('config');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.static(config.get('staticPath')));
  app.use(error);
};
