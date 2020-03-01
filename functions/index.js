const functions = require('firebase-functions');
const express = require('express');
const users = require('./firebase-db/Users.js');
const app=express();

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
        return res;
    }).catch((error) => {
        res.send("Yo Bro check up whats the issue here:  "+error);
        return res;
    });
    
});
function prepare_user_data(req,role){
    if(role==='rider'){
        user_data = {"email":req.body.email,
                    "pass":req.body.pwd,
                    "username":req.body.username,
                    "uin":req.body.uin 
                };
    }else{
        user_data = {"email":req.body.email,
                    "pass":req.body.pwd,
                    "username":req.body.username,
                };
    }
    return user_data;
}

app.post('/register-and-login-driver', (req, res) => {

    user_data=prepare_user_data(req,'driver');
    user_data['role']="driver";
    users.registerUser(user_data).then((result) => {
        console.log('registered User',user_data.email);
        res.render('loggedInDriver');
        return res;
    }).catch((error) => {
        res.send("Yo Bro check up whats the issue here:  "+error);
        return res;
    });
});

app.get('/register-rider', (req, res) => {
    
    res.render('registerRider');
});

app.post('/loginDriver', (req, res) => {
    data={"email":req.body.email,"pass":req.body.password};
    users.loginUser(data);
    res.render('loggedInDriver');    
});

app.post('/loginRider', (req, res) => {
    data={"email":req.body.email,"pass":req.body.password};
    users.loginUser(data)
    .then(()=>{
        console.log("Rider Logged In");
        return res.render('loggedInRider');
    }).catch((error)=>{
        res.send("Yo Bro U are not allowed on our site. " + error );
        return res;
    });
    
});

exports.app = functions.https.onRequest(app);
