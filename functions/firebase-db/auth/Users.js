/* eslint-disable promise/catch-or-return */
const firebase_admin = require('../init-db').firebase_admin
const firebase=require("firebase");
const validation=require('./validate.js');
const utils=require('../util.js');
const strings=require('../strings');




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
            utils.handleError(error);
            reject(new Error("DB call Failed. "+ error.message));
            return reject;
        })
    });
}

function storeUserData(params){
    return new Promise((resolve,reject)=>{
        
        var userref = db.collection('users').doc(params.uid);
        var data=utils.prepareUserDBObject(params);
        userref.set(data)
        .then((result)=>{
            data["path"]=userref.key;
            resolve(params);
            return result;

        }).catch((error)=>{
            utils.handleError(error);
            reject(new Error("DB call Failed. "+ error.message));
            return ;
        })
    });
}
function storeSessionRole(session,role){
    return new Promise((resolve,reject)=>{
        var sessionRef = db.collection('sessions').doc(session);
        // Atomically add a new region to the "regions" array field.
        sessionRef.set({
            role : role
        }).then((res)=>{
            resolve({sessionCookie: session});
            console.log('session cookie saved in DB',res);
            return res;
        }).catch((error)=>{
            utils.handleError(error);
            reject(new Error("Unable to store Session. "+ error.message));
            return ;
        });
    });
}

function loginUser(user){
    console.log("user",user);
    return new Promise((resolve,reject)=>{
        let idTokenObtained;
        firebase.auth().signInWithEmailAndPassword(user.email, user.pass)
        .then(data =>{
            // eslint-disable-next-line promise/no-nesting
            data.user.getIdToken().then(idToken => {
                idTokenObtained=idToken;
            });
            console.log('idtoken inside user.js',idTokenObtained);
            let isUserRoleValid=validation.validateUserRole(data.user.uid,user.role)
            return isUserRoleValid
        }).then((isUserRoleValid)=>{
            console.log("user status",isUserRoleValid);
            resolve(idTokenObtained);
            return idTokenObtained;
        }).
        catch((error) =>{
            utils.handleError(error);
            console.log('Login Failed.');
            reject(new Error("Login Failed. " + error.message));
        });
    });
}

function getSessionRole(session){
    
    return new Promise((resolve,reject)=>{
    var sessionRef = db.collection('sessions').doc(session);
    sessionRef.get().then((doc)=> {
        if (!doc.exists) {
            reject(new Error("Session Invalid"));
        } 
        resolve(doc.data().role);
        return doc.data().role;
    }).catch((error)=>{
        reject(new Error('Session Document unable to fetch' + error.message));
    });
});

}



function registerUser(user){

    return new Promise((resolve,reject) =>{
        //first validate User
        console.log("user",user);
        validation.validateUser(user).then ((validatedUser)=>{
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
            utils.handleError(error);
            reject(new Error("Registration Failed. "+error.message));
        });
            
    });
}

function getUserName() {
    
    return new Promise((resolve, reject) => {
        let currentUserUID = firebase.auth().currentUser.uid;
        let currentUserName = db.collection("users").doc(currentUserUID);
        currentUserName.get()
        .then((doc) => {
            resolve(doc.data().username);
            return;
        })
        .catch((err) => {
            console.error(err);
            reject(new Error("Could not get username"));
        });
    });
}

module.exports.registerUser=registerUser;
module.exports.loginUser=loginUser;
module.exports.storeSessionRole=storeSessionRole;
module.exports.getSessionRole=getSessionRole;
module.exports.getUserName = getUserName;