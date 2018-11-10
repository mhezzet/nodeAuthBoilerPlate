const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function() {
  const dbURI = config.get('dbURI');
  mongoose
    .connect(
      dbURI,
      { useNewUrlParser: true }
    )
    .then(() => {
      winston.info('connected to database ...');
    })
    .catch(() => {
      winston.error('error connected to database .');
    });
};
