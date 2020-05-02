import firebase from 'firebase' ;
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
class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.firestore=firebase.firestore();
        this.database=firebase.database();
        this.user= ''
    }
    doCreateUserWithEmailAndPassword = (email, password) =>{
        console.log('email',email);
        return this.auth.createUserWithEmailAndPassword(email, password);
    }
    getFirebaseUser = () =>{
        return this.auth.currentUser.uid;
    }
    

    doSignInWithEmailAndPassword = (email, password) =>{
        return this.auth.signInWithEmailAndPassword(email, password);
        // this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        // .then(function() {
        //     // Existing and future Auth states are now persisted in the current
        //     // session only. Closing the window would clear any existing state even
        //     // if a user forgets to sign out.
        //     // ...
        //     // New sign-in will be persisted with session persistence.
        //     return this.auth.signInWithEmailAndPassword(email, password);
        // })
        // .catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        // });
    }
    

    doSignOut = () => this.auth.signOut();
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
    
    doDeleteUser =() => this.auth.currentUser.delete();
    setRole =(data) =>{
        this.role=data
    }

    
  }

export default Firebase;
