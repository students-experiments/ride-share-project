const express = require('express');
const path = require('path');
const session = require('express-session');
//var firebaseui = require('firebaseui');
const firebase =require('firebase');
const firebase_admin = require("firebase-admin");
const auth=firebase_admin.auth;
const sendLoggedOut = (res) => {
  res.sendFile(path.join(__dirname, '../static/home.html'));
};

const router = express.Router();

// Reference : Express session site
router.use(
  session({
    cookie: {
      maxAge: 60000,
    },
    secret: 'mySecret',
  }),
);


/* GET home page. */
router.get('/', (req, res) => {
  // TODO: send the HTML of the home page if the user is not logged in,
  // and send the contents of the logged in page if the user is logged in.

  sendLoggedOut(res);
}); 
router.get('/register',(req, res) => {

  console.log("request",req.query);
  if(req.query.user === 'driver'){
    console.log("driver registry:");
    res.sendFile(path.join(__dirname, '../static/driver-register.html'));
  }else if(req.query.user === 'rider'){
    console.log("Rider registry:");
    res.sendFile(path.join(__dirname, '../static/rider-register.html'));
  }
  else{
    console.log('register failing');
    res.render('home');
  }

});


router.post('/register-rider', (req, res) => {
  // TODO: check that the user doesn't exist and add this user to the database.
  // Check whether username already exists in local store

  console.log('in register-rider');
  
  email=req.body.email;
  pass=req.body.password;

  console.log("email:",email);
  console.log("password",pass);
  if(!email || !pass){
    
    console.log("Email and password needed");
    res.render('rider-register');

  }
  else{
    
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(result){

      console.log("Email Authenticated");
      //var token = result.credential.accessToken;
      // The signed-in user info.
      //console.log(result);
      var user = result.user;
      console.log("uidddd",user.uid);
      var param={"uid": user.uid , "role" : "rider"};
      console.log("params",param);
      dbstore(param);

      res.render('home');

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return console.log(errorMessage);
    });
  }
    
  });
  function dbstore(params){
    console.log("params in DBStore",params);
    var db = firebase_admin.database();
    var ref = db.ref('server/users/');
    //var usersRef = ref.child("users");
    ref.set({
      uid:params.uid,
      role: params.role
      });
  }


  router.post('/register-driver', (req, res) => {
    // TODO: check that the user doesn't exist and add this user to the database.
    // Check whether username already exists in local store
  
    
    email=req.body.email;
    pass=req.body.password;
  
    console.log("email:",email);
    console.log("password",pass);
    if(!email || !pass){
      
      console.log("Email and password needed");

    }
    else{
      firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(result){
    
        console.log("Email Authenticated");
        //var token = result.credential.accessToken;
        // The signed-in user info.
        //console.log(result);
        var user = result.user;
        console.log("uidddd",user.uid);
        
        var param={"uid": user.uid , "role" : "driver"};
        console.log("params",param);
        dbstore(param);
        res.render('home');
    
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return console.log(errorMessage);
        
      });
    }
      
    });

  // router.get('/sign_in_with_google', (req, res) => {
  //   var provider = new firebase.auth.GoogleAuthProvider();
  //   provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  //   provider.setCustomParameters({
  //     'login_hint': 'user@example.com'
  //   });

  //   // Sign in with redirect:
  // firebase.auth().signInWithRedirect(provider)
  // ////////////////////////////////////////////////////////////
  // // The user is redirected to the provider's sign in flow...
  // ////////////////////////////////////////////////////////////
  // // Then redirected back to the app, where we check the redirect result:
  // firebase.auth().getRedirectResult().then(function(result) {
  // // The firebase.User instance:
  //   var user = result.user;
  //   // The Facebook firebase.auth.AuthCredential containing the Facebook
  //   // access token:
  //   var credential = result.credential;
  //   // As this API can be used for sign-in, linking and reauthentication,
  //   // check the operationType to determine what triggered this redirect
  //   // operation.
  //   var operationType = result.operationType;
  //   }, function(error) {
  //     // The provider's account email, can be used in case of
  //     // auth/account-exists-with-different-credential to fetch the providers
  //     // linked to the email:
  //     var email = error.email;
  //     // The provider's credential:
  //     var credential = error.credential;
  //     // In case of auth/account-exists-with-different-credential error,
  //     // you can fetch the providers using this:
  //     if (error.code === 'auth/account-exists-with-different-credential') {
  //       firebase.auth().fetchSignInMethodsForEmail(email).then(function(providers) {
  //         // The returned 'providers' is a list of the available providers
  //         // linked to the email address. Please refer to the guide for a more
  //         // complete explanation on how to recover from this error.
  //       });
  //     }
  //   });
    
  // });
  
module.exports = router;
