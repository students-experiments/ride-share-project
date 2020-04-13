import React from 'react';
import { Route, Router } from 'react-router';
import 'semantic-ui-css/semantic.min.css'

// Imports from internals
import history from '../../history';
import Firebase, { FirebaseContext } from '../Context';

//Header & Footer
import Header from "../../decorators/Header";
import Footer from '../../decorators/Footer';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

// auth
import LoginPage from '../SignIn/LoginPage';
import RegisterPage from '../SignUp/RegisterPage';
import ForgotPasswordForm from '../PasswordForget/ForgotPassword';

//Home Pages
import RiderHomePage from '../Rider/Home/HomePage';
import DriverHomePage from '../Driver/Home/Homepage';



class App extends React.Component {
    render() {
        return (
          <div id="root">
            <Header />
          <FirebaseContext.Provider value={new Firebase()}>
          <Router history = {history}>
              <Route exact path={ROUTES.ROOT} >
                  <LoginPage  />
              </Route>
              <Route exact path ={ROUTES.REGISTER} >
                  <RegisterPage  />
              </Route>
              <Route exact path = {ROUTES.LOG_IN} >
                <LoginPage />
              </Route>
              <Route exact path= {ROUTES.RIDER_HOME} >
                <RiderHomePage  />
              </Route>
              <Route exact path= {ROUTES.DRIVER_HOME} >
                <DriverHomePage  />
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
