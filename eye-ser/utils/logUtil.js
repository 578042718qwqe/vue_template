
var log4js = require('log4js')
var config = require('../config/config')

log4js.configure({
  appenders: { 
    server: { 
      type: 'dateFile', 
      filename: 'logs/server.log',
      keepFileExt:true 
    } },
  categories: { default: { appenders: ['server'], level: 'trace' } }
});


var logger = log4js.getLogger()
// logger.level = config.logLevel
// logger.debug('a10')
// logger.error('err11111')

// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');


module.exports = logger

