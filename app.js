const express = require('express');
const path = require('path');
const logger = require('morgan');
var firebase = require("firebase");
const indexRouter = require('./routes/index');

const app = express();
/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  /* only log http requests when not testing */
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './static')));
app.set('view engine', 'hbs');
app.use('/', indexRouter);

module.exports = app;
