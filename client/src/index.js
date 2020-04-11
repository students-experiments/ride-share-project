import React from 'react';
import ReactDOM from 'react-dom';
import { Router} from 'react-router';
import history from './history';

import {   Route, Link } from 'react-router';
import LoginPageBase from './components/SignIn/LoginPage';
import Firebase, { FirebaseContext } from './components/Context';

import * as ROUTES from './constants/routes';
import * as ROLES from './constants/roles';
import RegisterPage from './components/SignUp/RegisterPage';

import ForgotPasswordForm from './components/PasswordForget/ForgotPassword';
import 'semantic-ui-css/semantic.min.css'
//import * as ROUTES from './constants/routes';

import App from './components/App';
import * as routes from './routes';

ReactDOM.render(<App />,

    document.getElementById('root')
  );


  /*TODO:
  1/ use env for firebase constatnst
  2. create pages before writing anything.
  */
  