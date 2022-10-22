const log4js = require('log4js');
log4js.configure({
  appenders: {
    consoleAppender: {
      type: 'stdout'
    },
    fileAppender: {
      type: 'dateFile',
      filename: 'logs/server.log'
    }
  },
  categories: {
    default: {
      appenders: ['consoleAppender', 'fileAppender'],
      level: 'info'
    }
  }
})
const logger = log4js.getLogger()

module.exports = logger