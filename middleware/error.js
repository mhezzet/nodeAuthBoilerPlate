const winston = require('winston');
module.exports = function(err, req, res, next) {
  if (err) {
    winston.error(err.message, err);
    res.status(500).send('internal error');
  }
  next();
};
