import React from 'react';
import { withFirebase } from '../Firebase/context';
import Button from '@material-ui/core/Button';

const SignOutButton = ({ firebase }) => (
  <Button onClick={firebase.doSignOut} >
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);