import React from "react";
// import { Link } from "react-router-dom";
 import { Form, Button, Grid,Segment } from "semantic-ui-react";
import {withFirebase } from '../../Context/context'
import SignOut from '../../SignOut/SignOutButton';
import {withRouter} from 'react-router-dom';
// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class TransitPageBase extends React.Component {

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
const DriverTransitPage = withRouter(withFirebase(TransitPageBase))
export default DriverTransitPage;