import React from "react";
import { Form, Button, Grid,Segment } from "semantic-ui-react";
import AddLocationForm from './AddLocationForm'
import SignOut from '../../SignOut/SignOutButton';
import { withDriverAuthorization } from "../../Sessions";

// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class HomePageBase extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        
    }
   
    submit(data){
     
    }
    //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
  render() {
    return (
        <div >
          <div class="ui container">
          <div class="ui grid container">
              <Grid columns={2} relaxed='very' stackable>
              <Grid.Column textAlign ="center">
              <AddLocationForm />
                </Grid.Column>
                <Grid.Column textAlign ="center" verticalAlign = "bottom">
                <Button primary onClick={this.routeToRegister}>Ready To Pick Up </Button>
                </Grid.Column>
          </Grid>
          
          </div>
            <SignOut />
        </div>
        </div>

    );
  }
}

const DriverHomePage = withDriverAuthorization(HomePageBase)
export default DriverHomePage;

