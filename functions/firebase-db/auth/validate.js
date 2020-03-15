
//const firebase=require("firebase");

// const firebaseConfig = {
//     credentials: firebase_admin.credential.applicationDefault(),
//     apiKey: "AIzaSyAlfC_SV4Nbc9lfnmLnpOed58K9jYMB8N8",
//     authDomain: "uic-rider.firebaseapp.com",
//     databaseURL: "https://uic-rider.firebaseio.com",
//     projectId: "uic-rider",
//     storageBucket: "uic-rider.appspot.com",
//     messagingSenderId: "158636708222",
//     appId: "1:158636708222:web:519350eb086a15306a632f",
//     measurementId: "G-1QYZ38TLBN"
//   };

  // Initialize Firebase
  //firebase_admin.initializeApp(firebaseConfig);
  //firebase.initializeApp(firebaseConfig);

var firebase_admin = require ('../../app').firebase_admin;
var db = require('../init-db').firestore;

    function validateUser(user){
        return new Promise((resolve,reject)=>{
            if(user.email && user.pass && user.username )
                resolve("valid user");
            else{
                reject(new Error("invalid email or password"));        
            }
        });
    }

    function validateUserRole(uid,role){

        return new Promise((resolve,reject)=>{
            console.log("invalidation",uid);
            var userRef = db.collection('users').doc(uid);
            userRef.get()
            .then((doc)=> {
                if (!doc.exists) {
                    reject(new Error("invalid uid"));
                } 
                if(doc.data().role===role){
                    console.log('valid user');
                    resolve('valid user');
                }
                else{
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject(new Error("Not right role"));
                }
                return
            }).catch((error)=>{
                console.log('User role validation Failed');
                reject(new Error('User role validation Failed' + error.message));
            });
        });


    }
module.exports={
    validateUser: validateUser,
    validateUserRole: validateUserRole
};