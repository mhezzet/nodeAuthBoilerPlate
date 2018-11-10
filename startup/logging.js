const winston = require('winston');
const config = require('config');
require('express-async-errors');

module.exports = function() {
  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );

  if (config.get('env') === 'production') {
    winston.configure({
      level: 'info',
      exitOnError: false,
      format: winston.format.json(),

      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'log.log' })
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
      ]
    });

    process.on('unhandledRejection', ex => {
      throw ex;
    });
  }
};
