import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
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
        
    }
    //TODO: Change the following to pick route from User Controller
    routeToRegister = e =>
    this.props.history.push('/register')
    // under construction needs work
    submit(data){
      console.log('data',data);
      console.log('user',this.props.firebase);
      this.props.firebase.auth.currentUser.getIdTokenResult()
      .then((idTokenResult) => {
     // Confirm the user is an Admin.
      console.log('claims',idTokenResult.claims)
      this.props.history.push(resolveUser(idTokenResult.claims))

      
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push('/');
      });


      //this.props.login(data).then(() => this.props.history.push("/dashboard"));
    }
    
  render() {
    return (
        
        <div>
            {console.log(this.props.role)}
        <section className="section-login" >
            <h2> Login to your Account </h2>
                <LoginForm submit={this.submit} />
        
        <div >
        <section className="section-login">
        <Button secondary onClick={this.routeToRegister}>New Here? Register </Button>
        </section>
        
        </div>
      </section>
      </div>
    );
  }
}
const LoginPage = withRouter(withFirebase(LoginPageBase))
export default LoginPage;