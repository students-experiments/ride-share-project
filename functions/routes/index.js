
const express = require('express');
const users = require('../firebase-db/auth/Users.js');
const firebase_admin=require('../firebase-db/init-db').firebase_admin;
const session = require('express-session');

const router = express.Router();

router.get('/', (req, res,next) => {
    console.log(req.cookies);
    if (req.cookies && req.cookies.session) {
        const sessionCookie = `${req.cookies.session}`;
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
        firebase_admin.auth().verifySessionCookie(
        sessionCookie, true /** checkRevoked */)
            .then((decodedClaims) => {
                console.log('cookie verified',decodedClaims);
                console.log('session:',sessionCookie);
                next();
            }).catch(error => {
                // Session cookie is unavailable or invalid. Force user to login.
                console.log(error);
                res.render('home');
            });
    }else{
        console.log('no cookies set');
        res.render('home');
    }
    
    }, (req, res) => {
        const session=`${req.cookies.session}`;
        users.getSessionRole(session).then((role)=>{
            if(role==='rider'){
                res.render('loggedInRider');
            }
            else{
                res.render('loggedInDriver');
            }
        }).catch((error)=>{
            console.log(error);
            res.render('home');
        });

  });

router.get('/login-driver', (req, res) => {
    res.render('login',{role: 'driver'});
});

router.get('/login-rider', (req, res) => {
    res.render('login',{role: 'rider'});
});

router.get('/register-driver', (req, res) => {
    res.render('registerDriver');
});

router.post('/register-and-login-rider', (req, res) => {
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

router.post('/register-and-login-driver', (req, res) => {

    user_data=prepare_user_data(req,'driver');
    user_data['role']="driver";
    users.registerUser(user_data).then((result) => {
        console.log('registered User',user_data.email);
        res.redirect('/login-driver');
    }).catch((error) => {
        res.send("Yo Bro check up whats the issue here:  "+error);
    });
});

router.get('/register-rider', (req, res) => {
    
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
router.post('/loginDriver', (req, res) => {

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
router.get('/rider-landing',(req,res)=>{
    if(req.uid)
    {
        res.render('loggedInRider');
    }
    res.send('404.');
})

router.post('/loginRider', (req, res) => {
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
        //stiring session role in DB
        let storeSession=users.storeSessionRole(sessionCookie,'rider');
        return storeSession;
    }).then((storeSession)=>{
        // Set cookie policy for session cookie.
        const options = {maxAge: expiresIn, httpOnly: true};
        res.cookie('session', storeSession.sessionCookie, options);
        res.render('loggedInRider');
        //return res;
            
    }).catch((error)=>{
        res.status(401). send('UNAUTHORIZED REQUEST!' + error );
        return res;
    });
    
});

router.post('/logout',(req,res)=>{
    res.clearCookie('session');
    res.render('home');
})
module.exports = router;