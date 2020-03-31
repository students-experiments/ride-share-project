import React from 'react';
import ReactDOM from 'react-dom';
import { Router} from 'react-router';
import history from './history';

import {   Route, Link } from 'react-router';
import LoginPage from './components/SignIn/LoginPage';

import * as ROUTES from './constants/routes';
import * as ROLES from './constants/roles';
import RegisterPage from './components/SignUp/RegisterPage';
import {RiderLoggedIn} from './loggedInRider';
import ForgotPasswordForm from './components/PasswordForget/ForgotPassword';
import 'semantic-ui-css/semantic.min.css'
//import * as ROUTES from './constants/routes';

import * as routes from './routes';
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Router history={history}>
    <Route exact path="/" >
        <RegisterPage  />
    </Route>

    <Route exact path ={ROUTES.RIDER_LOG_IN} >
        <LoginPage  role = {ROLES.RIDER_ROLE} />
    </Route>
    <Route exact path = '/login' >
        <LoginPage role = {ROLES.DRIVER_ROLE} />
    </Route>
    <Route exact path={ROUTES.RIDER_REGISTER} >
        <RegisterPage role={ROLES.RIDER_ROLE} />
    </Route>
    <Route exact path={ROUTES.DRIVER_REGISTER} >
        <RegisterPage role={ROLES.DRIVER_ROLE} />
    </Route>
    <Route path = '/rider/loggedIN'>
        <RiderLoggedIn />
    </Route>
    <Route path = '/forgot_password'>
        <ForgotPasswordForm />
    </Route>

    </Router>,
    document.getElementById('root')
  );


  /*TODO:
  1/ use env for firebase constatnst
  2. create pages before writing anything.
  */
  