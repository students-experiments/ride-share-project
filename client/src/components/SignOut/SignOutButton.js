import React from 'react';
import {withFirebase } from '../Context/context'
import { Button } from "semantic-ui-react";
const SignOutButton = ({ firebase }) => (
  <Button onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);
export default withFirebase(SignOutButton);