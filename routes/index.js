const express = require('express');
const path = require('path');
const session = require('express-session');
//var firebaseui = require('firebaseui');
const firebase = require("firebase");
const auth=firebase.auth;
const sendLoggedOut = (res) => {
  res.sendFile(path.join(__dirname, '../static/loggedout.html'));
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


router.post('/register', (req, res) => {
  // TODO: check that the user doesn't exist and add this user to the database.
  // Check whether username already exists in local store

  
  email=req.body.email;
  pass=req.body.password;

  console.log("email:",email);
  console.log("password",pass);
  if(!email || !pass){
    
    return console.log("Email and password needed");
  }
  firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(result){

    console.log("Email Authenticated");
    //var token = result.credential.accessToken;
    // The signed-in user info.
    //console.log(result);
    var user = result.user;
    console.log("uidddd",user.uid);
    res.render('home');

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    return console.log(errorMessage);
    // ...
  });
    
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
