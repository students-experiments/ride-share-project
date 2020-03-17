//firebase
let firebase_admin = require("firebase-admin")
const firebase=require("firebase");

const firebaseConfig = {
    credentials: firebase_admin.credential.applicationDefault(),
    apiKey: "AIzaSyAlfC_SV4Nbc9lfnmLnpOed58K9jYMB8N8",
    authDomain: "uic-rider.firebaseapp.com",
    databaseURL: "https://uic-rider.firebaseio.com",
    projectId: "uic-rider",
    storageBucket: "uic-rider.appspot.com",
    messagingSenderId: "158636708222",
    appId: "1:158636708222:web:519350eb086a15306a632f",
    measurementId: "G-1QYZ38TLBN"
  };

// Initialize Firebase
firebase_admin.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const firestore =firebase_admin.firestore();

exports.firebase_admin=firebase_admin;
exports.firestore=firestore;
// USAGE:
/*
    - require the needed module from this init-db file.
    - find an example in validate.js
*/