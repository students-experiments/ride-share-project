
const firebase_admin = require("firebase-admin")
const firebase=require("firebase");
var path = require('path');


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

  var db = firebase_admin.firestore();

  function storeUserRole(username,role){
    return new Promise((resolve,reject)=>{
        var rolesRef = db.collection('roles').doc(role);
        // Atomically add a new region to the "regions" array field.
        let result=rolesRef.update({
            registered : firebase_admin.firestore.FieldValue.arrayUnion(username)
        }).then((result)=>{
            data={"username":username,"role":role}
            resolve(data);
            return result;
        }).catch((error)=>{
            handleError(error);
            reject(new Error("DB call Failed. "+ error.message));
            return reject;
        })
    });
}

function storeUserData(params){
    return new Promise((resolve,reject)=>{
        
        var userref = db.collection('users').doc(params.uid);
        var data=prepareUserDBObject(params);
        userref.set(data)
        .then((result)=>{
            data["path"]=userref.key;
            resolve(params);
            return result;

        }).catch((error)=>{
            handleError(error);
            reject(new Error("DB call Failed. "+ error.message));
            return ;
        })
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

function loginUser(user){
    console.log("user",user);
    return new Promise((resolve,reject)=>{
    firebase.auth().signInWithEmailAndPassword(user.email, user.pass)
    .then((data)=>{
        console.log('User SignIn Successful');
        let profile=firebase_admin.auth().getUserByEmail(user.email)
        return profile;
    }).then((profile)=>{
        console.log(profile.uid)
        let isUserRoleValid=validateUserRole(profile.uid,user.role)
        return isUserRoleValid
    }).then((isUserRoleValid)=>{
        console.log("user status",isUserRoleValid);
        resolve("success");
        return
    }).catch((error) =>{
        handleError(error);
        console.log('Login Failed.');
        reject(new Error("Login Failed. " + error.message));
      });
    });
}

function prepareUserDBObject(user){
    var data;
    data={
        "role": user.role,
        "username": user.username,
        "email":user.email
    };
    if(user.role==='rider'){
       data['uin']= user.uin
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

function validateUser(user){
    return new Promise((resolve,reject)=>{
        if(user.email && user.pass && user.username )
            resolve("valid user");
        else{
            reject(new Error("invalid email or password"));        
        }
    });
}

function registerUser(user){

    return new Promise((resolve,reject) =>{
        //first validate User
        console.log("user",user);
        validateUser(user).then ((validatedUser)=>{
            console.log('user credentials verified',validatedUser);
            let auth=firebase.auth().createUserWithEmailAndPassword(user.email, user.pass);
            return auth;
        }).then((auth)=>{
            //store users data
            console.log('user created with firebase:',user.username);
            user['uid']=auth.user.uid;
            let addUserToDb=storeUserData(user);
            return addUserToDb;
        }).then((addUserToDb) =>{
            // Store Users role.
            console.log('user Added to User DB: ',user.username);
            let addUserToRole=storeUserRole(user.username,user.role);
            return addUserToRole;
        }).then((addUserToRole)=>{
            console.log('user Added to Role DB: ',addUserToRole.username);
            return resolve('Success');
        }).catch((error)=>{
            console.log(error);
            handleError(error);
            reject(new Error("Registration Failed. "+error.message));
        });
            
    });
}

module.exports.registerUser=registerUser;
module.exports.loginUser=loginUser;

