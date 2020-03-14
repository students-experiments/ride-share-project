const firebase=require("firebase");


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
        let isUserRoleValid=validation.validateUserRole(profile.uid,user.role)
        return isUserRoleValid
    }).then((isUserRoleValid)=>{
        console.log("user status",isUserRoleValid);
        resolve("success");
        return
    }).catch((error) =>{
        utils.handleError(error);
        console.log('Login Failed.');
        reject(new Error("Login Failed. " + error.message));
    });
    });
}
