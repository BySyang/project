var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var pages = require('./routes/pages');
var users = require('./routes/users');
var orders = require('./routes/orders');
var api = require('./routes/api');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser('session'));
app.use(session({
  secret: 'abcd',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 8000000
  }
}))
//分发路由
app.use(express.static(path.join(__dirname, 'static')));
app.use(pages);
app.use( users);
app.use(orders);
app.use(api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;