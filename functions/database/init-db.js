//firebase
let firebase_admin = require("firebase-admin")
const firebase=require("firebase");

const firebaseConfig = {
    credentials: firebase_admin.credential.applicationDefault()
  };

// Initialize Firebase
if(process.env.NODE_ENV ==='TEST'){
  firebase_admin.initializeApp();
  firebase.initializeApp();
}
else{
  firebase_admin.initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
}


exports.firebase_admin=firebase_admin;
exports.firestore=firebase_admin.firestore();

// USAGE:
/*
    - require the needed module from this init-db file.
    - find an example in validate.js
*/