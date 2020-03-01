const functions = require('firebase-functions');
const express = require('express');
// const engines = require('consolidate');


const app=express();

app.set('views','./views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/',(request,response)=>{
    response.render('home');
})

app.get('/homeDriver', (req, res) => {
    res.render('homeDriver');
});

app.get('/homeRider', (req, res) => {
    res.render('homeRider');
});

app.get('/registerDriver', (req, res) => {
    res.render('registerDriver');
});

app.get('/registerRider', (req, res) => {
    res.render('registerRider');
});

app.post('/loginDriver', (req, res) => {
    res.render('loggedInDriver');    
});

app.post('/loginRider', (req, res) => {
    res.render('loggedInRider');
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
