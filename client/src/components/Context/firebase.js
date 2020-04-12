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
    }
    doCreateUserWithEmailAndPassword = (email, password) =>{
        console.log('email',email);
        return this.auth.createUserWithEmailAndPassword(email, password);
    }
    

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
    
    doDeleteUser =() => this.auth.currentUser.delete();
  }

export default Firebase;