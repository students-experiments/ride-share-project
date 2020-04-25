import React from "react";
import { Link } from "react-router-dom";
import { Button,Segment,Grid,Divider } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import {withFirebase } from '../Context/context'
import Firebase from '../Context/index';
import resolveUser from '../../controller/UserController'
import {withRouter} from 'react-router-dom';
// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class LoginPageBase extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            style: {
                "textAlign": "center"
            }
        };
    }
    //TODO: Change the following to pick route from User Controller
    routeToRegister = e =>
    this.props.history.push('/register');
    // under construction needs work

    submit(data){
      console.log('data',data);
      console.log('user',this.props.firebase);
      this.props.firebase.auth.currentUser.getIdTokenResult()
      .then((idTokenResult) => {
     // Confirm the user is an Admin.
      console.log('claims',idTokenResult.claims);
      this.props.history.push(resolveUser(idTokenResult.claims) + '/home')

      
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push('/');
      });


      //this.props.login(data).then(() => this.props.history.push("/dashboard"));
    }
    
  render() {
    return (
        
      <div >
            <br/>
            <div className="ui container">
            <div className="ui two column centered grid">
            <Segment placeholder>
              <Grid columns={2} relaxed='very' stackable>
                <Grid.Column>
                  <LoginForm submit={this.submit} />
                </Grid.Column>
        
                <Grid.Column verticalAlign='middle'>
                  <Button secondary onClick={this.routeToRegister}>New Here? Register </Button>
                </Grid.Column>
              </Grid>

              <Divider vertical>Or</Divider>
            </Segment>
            </div>
            </div>
      </div>
    );
  }
}
const LoginPage = withRouter(withFirebase(LoginPageBase)) 
export default LoginPage;