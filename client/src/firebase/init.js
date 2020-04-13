const firebase = require("firebase");
// Remember Firebase admin should not be used in Client side apps.
// In case of need to usign custom claims follow instructions in this link
// https://firebase.google.com/docs/auth/admin/custom-claims

const firebaseConfig = {
    apiKey: "AIzaSyAlfC_SV4Nbc9lfnmLnpOed58K9jYMB8N8",
    authDomain: "uic-rider.firebaseapp.com",
    databaseURL: "https://uic-rider.firebaseio.com",
    projectId: "uic-rider",
    storageBucket: "uic-rider.appspot.com",
    messagingSenderId: "158636708222",
    appId: "1:158636708222:web:519350eb086a15306a632f",
    measurementId: "G-1QYZ38TLBN"
};
firebase.initializeApp(firebaseConfig);


module.exports.firebase = firebase;
