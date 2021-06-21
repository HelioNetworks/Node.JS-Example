var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var init = express();

// view engine setup
init.set('views', path.join(__dirname, 'views'));
init.set('view engine', 'pug');

init.use(logger('dev'));
init.use(express.json());
init.use(express.urlencoded({ extended: false }));
init.use(cookieParser());
init.use(express.static(path.join(__dirname, 'public')));

init.use('/', indexRouter);
init.use('/users', usersRouter);

// catch 404 and forward to error handler
init.use(function(req, res, next) {
  next(createError(404));
});

// error handler
init.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = init;
