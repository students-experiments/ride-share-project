const test = require('firebase-functions-test')({
    databaseURL: "https://uic-rider.firebaseio.com",
    projectId: "uic-rider",
    storageBucket: "uic-rider.appspot.com",
  }, require('path').join(__dirname,'../../uic-night-ride-service-account.json'));

  //const cred=require();


// const firebaseConfig = {
//     credentials: firebase_admin.credential.cert(cred),
//     apiKey: "AIzaSyAlfC_SV4Nbc9lfnmLnpOed58K9jYMB8N8",
//     authDomain: "uic-rider.firebaseapp.com",
//     databaseURL: "https://uic-rider.firebaseio.com",
//     projectId: "uic-rider",
//     storageBucket: "uic-rider.appspot.com",
//     messagingSenderId: "158636708222",
//     appId: "1:158636708222:web:519350eb086a15306a632f",
//     measurementId: "G-1QYZ38TLBN"
//   };