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

app.set('views', __dirname + "/views");
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './static')));
app.use('/', indexRouter);

/* */
// app.get('/', require('./routes').index);

module.exports = app;
