import React from 'react';
import { Router} from 'react-router';
import history from '../../history';
import Footer from '../../layouts/Footer';
import {   Route, Link } from 'react-router';
import LoginPage from '../SignIn/LoginPage';
import Firebase, { FirebaseContext } from '../Context';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import RegisterPage from '../SignUp/RegisterPage';

import ForgotPasswordForm from '../PasswordForget/ForgotPassword';
import 'semantic-ui-css/semantic.min.css'

import { DefaultLayout } from "../../layouts/DefaultLayout.js";


class App extends React.Component {
    render() {
        return (
          <div id="root">
            <DefaultLayout />
          <FirebaseContext.Provider value={new Firebase()}>
          <Router history = {history}>
              <Route exact path="/" >
                  <RegisterPage history = {history} />
              </Route>
  
              <Route exact path ={ROUTES.RIDER_LOG_IN} >
                  <LoginPage  role = {ROLES.RIDER_ROLE} />
              </Route>
              <Route exact path = '/login' >
                <LoginPage  />
              </Route>
              <Route exact path={ROUTES.RIDER_REGISTER} >
                  <RegisterPage role={ROLES.RIDER_ROLE} />
              </Route>
              <Route exact path={ROUTES.DRIVER_REGISTER} >
                  <RegisterPage role={ROLES.DRIVER_ROLE} />
              </Route>

              <Route path = '/forgot_password'>
                  <ForgotPasswordForm />
              </Route>
  
          </Router>
      </FirebaseContext.Provider>
      <hr />
      <Footer /> 
          </div>
        );
      }
    }
export default App;
