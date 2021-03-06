var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//store session into mongodb
//mongodb
//var MongoStore = require('connect-mongo');
//var settings = require('./settings');
//app.use(express.session({
//  secret: settings.cookieSecret,
//  store: new MongoStore({
//    db: settings.db
//  })
//}));

//routes
var index = require('./routes/index');
var users = require('./routes/users');
var price = require('./routes/rss/price');
var reg = require('./routes/users/reg');

//urls
app.use('/', index);
app.use('/users', users);
app.use('/price', price);
app.use('/reg', reg);

var mongodb = require('./dao/mongodb');

//Connect to mongodb
mongodb.connect(function(error){
  if (error) throw error;
});
app.on('close', function(errno) {
  mongodb.disconnect(function(err) { });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;