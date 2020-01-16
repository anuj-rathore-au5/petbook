var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session')



// var cookieParser = require('cookie-parser');


var indexRouter = require('./routes/index');
var AuthusersRouter = require('./routes/Authusers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret:'disaster',
  cookie:{
    maxAge:1000*60*60,
    rolling:true
  }
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));


app.use('/', indexRouter);
app.use('/Authusers', AuthusersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(5000)