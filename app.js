var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

require('dotenv').config()
require('./db');


var indexRouter = require('./routes/index');
var mutantRouter = require('./routes/mutant');
var statsRouter = require('./routes/stats');

const cors = require('cors');



app.use(cors());


app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/mutant', mutantRouter);
app.use('/stats', statsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   var err = new Error('404: Not Found '); //here
    err.status = 404;
    next(err);
});

// error handler
app.use(ErrorHandlers);

function ErrorHandlers(err, req, res, next) {
  // set locals, only providing error in development
  console.log(process.env.PRODUCTION)
  var PRODUCTION = process.env.PRODUCTION;
  var error = PRODUCTION === 'true' ? null : err.stack;

  // render the error page
  res.status(err.status || 500);
  res.json({"code":err.status,"response":err.message,"error":error});
}

module.exports = app;