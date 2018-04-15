
// var require1 = global.require

// require.main.paths.push(__dirname)
// console.log(require.main.paths + '')
// global.require = function(name) {
//   console.log('name:',name)
//   return require1(__dirname + '/' + name);
// }
// require('app-module-path/register')
require('app-module-path').addPath(__dirname)

var path = require('path');
// console.log(path.resolve(__dirname))
// console.log(global.prefixPath)
// global.prefixPath = path.resolve(__dirname)
// require.main.paths.push(__dirname + '\\')
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var webRoute = require('./routes/web/route');
var adminRoute = require('./routes/admin/route')
var sysInit = require('./utils/sysInit')
var log = require("./utils/logUtil")
var timeout = require('connect-timeout')
var ajaxResult = require('utils/ajaxResult')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(timeout('5s'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(haltOnTimedout)
app.use(cookieParser())
// app.use(haltOnTimedout)
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', webRoute);
app.use('/admin', adminRoute);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  var ret = ajaxResult.getInstance()
  ret.status = 2
  ret.message = err.message
  console.log(err)
  log.error('error handler')
  log.error(err)
  res.end(JSON.stringify(ret))
  // log.error(err.stack)
  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});



//防止一些奇怪业务异常导致的崩溃
process.on('uncaughtException', function (err) {
  //打印出错误
  console.log('uncaughtException log:',err)
  //打印出错误的调用栈方便调试
  // console.log(err.stack)
  log.error(err)

});

sysInit.init()

module.exports = app;
