
const firebase_admin = require("firebase-admin")
const firebase=require("firebase");

const serviceAccount = require('/Users/anoopnagabhushan/Desktop/UIC/CS494/ride match/final-project-create-table-students/firebase-service-account.json');
var refreshToken;
const admin_config={
    credentials:firebase_admin.credential.cert(serviceAccount),
    databaseURL: "https://uic-rider.firebaseio.com"
}

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
  
  
  // Initialize Firebase
  firebase_admin.initializeApp({
    credential: firebase_admin.credential.cert(serviceAccount),
    databaseURL: "https://uic-rider.firebaseio.com"
  });
  firebase.initializeApp(firebaseConfig);
  

function writeUserToUserTable(params,role){
    return new Promise((resolve,reject)=>{
        var db = firebase_admin.database();
        console.log("uid in db fucn",params.uid);
        var userref = db.ref('users/').child(params.uid);
        console.log('path in DB',userref.key);
        var data=prepareUserDBObject(params,role);
        userref.set(data).then((result)=>{
            data["path"]=userref.key;
            resolve(data);
            return result;

        }).catch((error)=>{
            handleError(error);
            reject(new Error("DB call Failed. "+ error.message));
            return reject;
        })
    });
}
function loginUser(user){
    console.log("user",user);
    return new Promise((resolve,reject)=>{
    firebase.auth().signInWithEmailAndPassword(user.email, user.pass)
    .then(()=>{
        console.log('User authenticated');
        return resolve("success");
    })
    .catch((error) =>{
        handleError(error);
        console.log('Login Failed.');
        reject(new Error("Login Failed. " + error.message));
      });
    });
}
function prepareUserDBObject(params,role){
    var data;
    if(role==='rider'){
       data={
            "role": params.role,
            "username": params.username,
            "uin": params.uin
        };
    }
    else{
        data={
            "role": params.role,
            "username": params.username,
        };
    }
    return data;

}
function handleError(error){
    // Handle Errors here.
    let errorCode= 404;
    if(error.code)
        errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
}

function validateUser(user,role){
    return new Promise((resolve,reject)=>{
        if(user.email && user.pass && user.username )
            resolve("valid user");
        else{
            reject(new Error("invalid email or password"));        
        }
    });
}

function registerUser(user,role){

    return new Promise((resolve,reject) =>{
        //first validate User
        console.log("user",user);
        validateUser(user,role).then ((validatedUser)=>{
            console.log('user credentials verified',validatedUser);
            let auth=firebase.auth().createUserWithEmailAndPassword(user.email, user.pass);
            return auth;
        }).then((result) => {
            //User DB Call
            console.log('user authenticated user:',user);
            user.uid=result.user.uid;
            userdbcall=writeUserToUserTable(user,role);
            return userdbcall;
        }).then((userdbcall) =>{
            // Modify the DBCall Object before sending.
            console.log('user Added to DB: ',userdbcall.uid);
            return resolve('Success');
        }).catch((error)=>{
            //console.log(error);
            handleError(error);
            reject(new Error("Registration Failed. "+error.message));
        });
            
    });
}

module.exports.registerUser=registerUser;
module.exports.loginUser=loginUser;

