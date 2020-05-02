import firebase from 'firebase' ;
// Remember Firebase admin should not be used in Client side apps.
// In case of need to usign custom claims follow instructions in this link
// https://firebase.google.com/docs/auth/admin/custom-claims

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId : process.env.REACT_APP_APP_ID,
    measurementId : process.env.REACT_APP_MEASUREMENT_ID
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
