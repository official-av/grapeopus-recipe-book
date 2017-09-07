var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var authenticate=require('./authenticate');

//setting up mongoose
var mongoose = require('mongoose');
var config=require('./config');
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected correctly to server");
});

//setting up routes
var users = require('./routes/users');
var recipes = require('./routes/recipes');
var shopList=require('./routes/shoppinglist');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//middleware setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(passport.initialize());

//using routes
app.use('/recipes',recipes);
app.use('/shopList',shopList);
app.use('/users', users);

app.use('/*', function (req, res) {
   res.sendFile(__dirname + '/dist/index.html');
});

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

  // render the error page
  res.sendFile(__dirname + '/dist/index.html');
});

module.exports = app;
