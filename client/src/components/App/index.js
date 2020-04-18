import React from 'react';
import {  BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

// Imports from internals
import history from '../../history';
import Firebase, { FirebaseContext } from '../Context';

//Header & Footer
import PageHeader from "../../decorators/Header";
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

//transit pages
import RiderTransitPage from '../Rider/transit/transit';

class App extends React.Component {
    render() {
        return (
          <div id="root">
            <PageHeader />
          <FirebaseContext.Provider value={new Firebase()}>
          <Router history = {history}>
            <Switch>
              <Route  exact={true} path={ROUTES.ROOT} >
                  <LoginPage  />
              </Route>
              <Route   path ={ROUTES.REGISTER} >
                  <RegisterPage  />
              </Route>
              <Route   path = {ROUTES.LOG_IN} >
                <LoginPage />
              </Route>
              <Route   path= {ROUTES.RIDER_HOME} >
                <RiderHomePage  />
              </Route>
              <Route   path= {ROUTES.DRIVER_HOME} >
                <DriverHomePage  />
              </Route>
              <Route  path= '/rider/transit'>
                  <RiderTransitPage />
              </Route>
              <Route  path= '/driver/home'>
                  <DriverHomePage />
              </Route>

              <Route  path = '/forgot_password'>
                  <ForgotPasswordForm />
              </Route>
              </Switch>
          </Router>
      </FirebaseContext.Provider>
      <hr />
      <Footer /> 
          </div>
        );
      }
    }
export default App;
