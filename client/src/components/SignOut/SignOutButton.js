import React from 'react';
import {withFirebase } from '../Context/context'
import {withRouter} from 'react-router-dom';
import { Button } from "semantic-ui-react";
import {LOG_IN} from "../../constants/routes";

// Redirects back to Log-In page
const SignOutButton = (props) => {
    return (
        <Button onClick = {() => { props.firebase.doSignOut(); props.history.push(LOG_IN)}}>
            Sign Out
        </Button>
    );
};

/*const SignOutButton = ({ firebase }) => (
  <Button onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);*/

export default withRouter(withFirebase(SignOutButton));