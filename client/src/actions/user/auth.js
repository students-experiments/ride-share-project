
// import {firebase} from '../../firebase/init';
 import {postUserClaims} from '../api/UserRequests';

// /*
// Creates a new user with firebase auth.
// */
// export function signUp (credentials){
//     return new Promise((resolve,reject)=>{
//         let profile;
//         console.log(credentials);
//         const claims={role: credentials.role, uin: credentials.uin}
//         createNewUser(credentials.email,credentials.password)
//         .then((result)=>{
//             profile=result.user;
//             console.log('User Profile Created for user email: ',result.user.email)
//             return addCustomClaims(result.user.uid,claims);
//         }).then(()=>{
//             console.log('Claims added for user ');
//             resolve(profile)
//         }).catch((err)=>{
//             console.log('error occoured');
//             reject(err);
//         })
//     });
    
// }
// /*
// helper function which Creates a new user with firebase auth.
// */
// function createNewUser (email,password){
//     return firebase.auth().createUserWithEmailAndPassword(email,password);
// }
/*
helper function which adds claims to the user provided with uid 
*/
// claims can be added by admin SDK of firebase. 
export function addCustomClaims(user, claims){
    return postUserClaims(user, claims);
}

