//firebase
let firebase_admin = require("firebase-admin")
const firebase=require("firebase");

const firebaseConfig = {
    credentials: firebase_admin.credential.applicationDefault()
  };

// Initialize Firebase
firebase_admin.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

exports.firebase_admin=firebase_admin;
exports.firestore=firebase_admin.firestore();
exports.realtimedb=firebase_admin.database();
// USAGE:
/*
    - require the needed module from this init-db file.
    - find an example in validate.js
*/