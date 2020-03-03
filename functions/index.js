/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const express = require('express');
const users = require('./firebase-db/Users.js');
const session = require('express-session');
const app=express();

const router=express.Router();
router.use(
    session({
      cookie: {
        maxAge: 60000,
      },
      secret: 'mySecret',
    }),
  );
app.set('views','./views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/',(request,response)=>{
    response.render('home');
})

app.get('/login-driver', (req, res) => {
    res.render('loginDriver');
});

app.get('/login-rider', (req, res) => {
    res.render('loginRider');
});

app.get('/register-driver', (req, res) => {
    res.render('registerDriver');
});

app.post('/register-and-login-rider', (req, res) => {

    user_data=prepare_user_data(req,'rider');
    user_data['role']="rider";
    users.registerUser(user_data).then((result) => {
        console.log('registered User',user_data.email);
        res.render('loggedInRider');

    }).catch((error) => {
        res.send("Yo Bro check up whats the issue here:  " + error);
    });
    
});

function prepare_user_data(req,role){

    var user_data = {"email":req.body.email,
                    "pass":req.body.pwd,
                    "username":req.body.username,
                    };
    if(role==='rider'){
        user_data["uin"]=req.body.uin 
    }
    return user_data;
}

app.post('/register-and-login-driver', (req, res) => {

    user_data=prepare_user_data(req,'driver');
    user_data['role']="driver";
    users.registerUser(user_data).then((result) => {
        console.log('registered User',user_data.email);
        res.render('loggedInDriver');
    }).catch((error) => {
        res.send("Yo Bro check up whats the issue here:  "+error);
    });
});

app.get('/register-rider', (req, res) => {
    
    res.render('registerRider');
});

function loginUser(req,role){
    data = { "email":req.body.email,
    "pass":req.body.password,   
    "role":role
    };
    let loggedIn=users.loginUser(data);
    return loggedIn;
}
app.post('/loginDriver', (req, res) => {

    loginUser(req,'driver')
    .then(()=>{
        console.log("Driver Logged In");
        res.render('loggedInDriver');    
        return;
    }).catch((error)=>{
        res.send("Yo Bro U are not allowed on our site. " + error );
        return res;
    });
    
});

app.post('/loginRider', (req, res) => {
    
    loginUser(req,'rider')
    .then(()=>{
        console.log("Rider Logged In");
        return res.render('loggedInRider');
    }).catch((error)=>{
        res.send("Yo Bro U are not allowed on our site. " + error );
        return res;
    });
    
});

exports.app = functions.https.onRequest(app);
