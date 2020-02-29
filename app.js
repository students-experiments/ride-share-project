const express = require('express');
const path = require('path');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const admin = require("firebase-admin");

var serviceAccount = require("/Users/anoopnagabhushan/Desktop/UIC/CS494/ride match/final-project-create-table-students/uic-rider-firebase-adminsdk-5w2n7-934e616fef.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://uic-rider.firebaseio.com"
});

//firbase dependency
var firebase = require("firebase");
// var firebaseui = require('firebaseui');
// Install express server
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

//firebase config setup

const firebaseConfig = {
  apiKey: "AIzaSyAlfC_SV4Nbc9lfnmLnpOed58K9jYMB8N8",
  authDomain: "uic-rider.firebaseapp.com",
  databaseURL: "https://uic-rider.firebaseio.com",
  projectId: "uic-rider",
  storageBucket: "uic-rider.appspot.com",
  messagingSenderId: "158636708222",
  appId: "1:158636708222:web:519350eb086a15306a632f",
  measurementId: "G-1QYZ38TLBN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



module.exports = app;
