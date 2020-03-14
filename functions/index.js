/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const express = require('express');
const users = require('./firebase-db/auth/Users.js');
const session = require('express-session');
const app = express();
const auth_controller=require('./controllers/auth.js');
const cookieParser = require('cookie-parser');
//const FileStore = require('session-file-store')(session)
const firebase_admin = require("firebase-admin")
const firebase_config=require('./firebase-db/firebase-config')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(session({
//   secret: 'asdf;lkjh3lkjh235l23h5l235kjh',
//   resave: true,
//   saveUninitialized: false,
//   save: new FileStore(),
//   cookie: {
//     expires: 600000
//     }
// }))

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
        users.registerUser(user_data).then(() => {
            console.log('registered User',user_data.email);
            res.redirect('/login-rider');
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
        res.redirect('/login-driver');
    }).catch((error) => {
        res.send("Yo Bro check up whats the issue here:  "+error);
    });
});

app.get('/register-rider', (req, res) => {
    
    res.render('registerRider');
});

function loginUser(req,role){
    data = { 
        "email":req.body.email,
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
app.get('/rider-landing',(req,res)=>{
    if(req.isAuthenticated)
    {
        res.render('loggedInRider');
    }
    res.send('404.');
})

app.post('/loginRider', (req, res) => {
    const expiresIn = 60 *  5  * 1000;
    loginUser(req,'rider')
    .then((idToken)=>{
        console.log('idtoken',idToken);
        
        // Set session expiration to 5 days.
        
        // Create the session cookie. This will also verify the ID token in the process.
        // The session cookie will have the same claims as the ID token.
        // To only allow session cookie setting on recent sign-in, auth_time in ID token
        // can be checked to ensure user was recently signed in before creating a session cookie.
        let  sessionCookie=firebase_admin.auth().createSessionCookie(idToken, {expiresIn})
        return sessionCookie;
    }).then((sessionCookie) => {
            // Set cookie policy for session cookie.
        const options = {maxAge: expiresIn, httpOnly: true, secure: true};
        res.cookie('session', sessionCookie, options);
        res.render('loggedInRider');
        return res;
            
    }).catch((error)=>{
        res.status(401). send('UNAUTHORIZED REQUEST!' + error );
        return res;
    });
    
});

app.post('/logout',(req,res)=>{
    res.clearCookie('session');
    res.render('home');
})
exports.app = functions.https.onRequest(app);
