var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var indexRouter = require('./routes/index');

const cors = require('cors');

require('dotenv').config()

app.use(cors());


app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   var err = new Error('404: Not Found ' + req.originalUrl); //here
    err.status = 404;
    next(err);
});

// error handler
app.use(ErrorHandlers);

function ErrorHandlers(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({"code":err.status,"response":err.message,"error":err.stack});
}

module.exports = app;