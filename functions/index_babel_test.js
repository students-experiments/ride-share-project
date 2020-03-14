/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const express = require('express');
const users = require('./firebase-db/auth/Users.js');
const session = require('express-session');
const app = express();
const auth_controller=require('./controllers/auth.js');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'LONG_RANDOM_STRING_HERE',
  resave: true,
  saveUninitialized: false
}))

app.set('views','./view_js');
app.set('view engine', 'js');
app.engine('js', require('express-react-views').createEngine());

app.get('/',(request,response)=>{
    var initialState = {
        items: [
          'document your code',
          'drop the kids off at the pool',
          '</script><script>alert(666)</script>',
        ],
        text: '',
      };
      response.render('Html', {data: initialState});
    
})
app.get('/login-driver', (req, res) => {
    res.render('loginDriver');
});


app.get('/login-rider', (req, res) => auth_controller.loginDriver(req,res));

app.get('/register-driver', (req, res) => {
    res.render('registerDriver');
});

app.post('/register-and-login-rider', (req, res) => auth_controller.registerAndLogin(req,res));

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
