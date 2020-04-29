import React from "react";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
import resolveUser from '../../controller/UserController';
import { withAuthentication } from "../Sessions";
//import { withFirebase } from '../Context/context';
import LoginForm from "./LoginForm";
// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class LoginPageBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          user : '',
          loading: true,
            style: {
                "textAlign": "center"
            }
        };
        this.submit = this.submit.bind(this);
        this.reRoute=this.reRoute.bind(this);
        
    }
    //TODO: Change the following to pick route from User Controller
    routeToRegister = e =>
    this.props.history.push('/register');
    // under construction needs work


    submit(data){
      this.setState({user: this.props.firebase.auth.currentUser})
      this.reRoute()
    }
    reRoute() {
      this.setState({ loading : true})
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
    }
   
    componentDidMount(){
      
    }

    
  render() {
    return (
        
      <div  >

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
const LoginPage = withAuthentication(LoginPageBase);
export default LoginPage;