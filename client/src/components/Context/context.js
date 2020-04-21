// Firebase context tutotial:
// https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
import React from 'react';
const FirebaseContext = React.createContext(null);
// this is another level abstraction which can be used when necessary.
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
export default FirebaseContext;

