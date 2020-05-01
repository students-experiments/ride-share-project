import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Segment } from 'semantic-ui-react';
import * as ROUTES from '../../constants/routes';
import Footer from '../../decorators/Footer';
// Imports from internals
import history from '../../history';
import Firebase, { FirebaseContext } from '../Context';
import DriverHomePage from '../Driver/Home/Homepage';
import DriverTransitPage from '../Driver/Transit/TransitPage';
import DesktopContainer from '../MainContainer/container';
import ForgotPasswordForm from '../PasswordForget/ForgotPassword';
//Home Pages
import RiderHomePage from '../Rider/Home/HomePage';
//transit pages
import RiderTransitPage from '../Rider/transit/transit';
// auth
import LoginPage from '../SignIn/LoginPage';
import PreSignIn from '../SignIn/PreSignIn';
import RegisterPage from '../SignUp/RegisterPage';
//images
import back from "./grey2.PNG"



class App extends React.Component {
    render() {
        return (
          <div id="root">
            <DesktopContainer >
            <Segment style={{ 
              padding: '0em 0em', 
              height: '40rem',
              backgroundImage: `url(${back})`,
              backgroundSize: '100% 100%', 
              }} vertical>
          <FirebaseContext.Provider value={new Firebase()}>
          <Router history = {history}>
            <Switch>
              <Route  exact path={ROUTES.ROOT} >
                  <PreSignIn  />
              </Route>
              <Route   path ={ROUTES.REGISTER} >
                  <RegisterPage  />
              </Route>
              <Route   path = {ROUTES.LOG_IN} >
                <LoginPage />
              </Route>
              <Route   path= {ROUTES.RIDER_HOME }>
                <RiderHomePage  />
              </Route>
              <Route  path= {ROUTES.RIDER_TRANSIT}>
                  <RiderTransitPage />
              </Route>
              <Route  path= {ROUTES.DRIVER_HOME }>
                  <DriverHomePage />
              </Route>
              <Route  path= {ROUTES.DRIVER_TRANSIT }>
                  <DriverTransitPage />
              </Route>

              <Route  path = '/forgot_password'>
                  <ForgotPasswordForm />
              </Route>
              </Switch>
          </Router>
      </FirebaseContext.Provider>

      </Segment>
      <Footer /> 
      </DesktopContainer>
          </div>
        );
      }
    }
export default App;
