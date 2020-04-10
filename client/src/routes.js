import React from 'react';
import { Route } from 'react-router';

/**
 * Import all page components here
 */
import App from './components/App';
import {LoginPage} from './components/SignIn/login_';
import * as ROUTES from './constants/routes';
import * as ROLES from './constants/roles';
import {RegisterPage} from './register';
import Login from './NewLogin';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */

export default (
    <div>
    <Route exact path="/" component={Login}/>
    <Route path="/login" component={LoginPage}/>
    <Route path= '/register/rider'  component={RegisterPage}/>
    </div>
);
