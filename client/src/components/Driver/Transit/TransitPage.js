import React from "react";
// import { Link } from "react-router-dom";
 import { Form, Button, Grid,Segment,Divider } from "semantic-ui-react";
import {withFirebase } from '../../Context/context'
import SignOut from '../../SignOut/SignOutButton';
import {withRouter} from 'react-router-dom';
import RideRequestActionBox from './RideRequestActionBox'
import IntransitActionBox from './InTransitActionBox'
import withDriverAuthorization from "../../Sessions/withDriverAuthorization";
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
          <div className="ui container">
          <div className="ui grid container">
              <Grid columns={2} relaxed='very' stackable>
              <Grid.Column >
              <div className="ui segment">

              <h2 className="ui orange center aligned header">Ride Requests</h2>

                <RideRequestActionBox />
                <hr />
                <RideRequestActionBox />
                <hr />
                <RideRequestActionBox />
                <hr />
                <RideRequestActionBox />
                <hr />
                <RideRequestActionBox />
                 <hr />
                <RideRequestActionBox />
                <hr />
                <RideRequestActionBox />
              </div>
              
                </Grid.Column>
                <Grid.Column >
                  <div class="ui segment">

                    <h2 class="ui olive center aligned header">In Transit</h2>
                    <IntransitActionBox />
                      <hr />
                      <IntransitActionBox />
                      <hr />
                      <IntransitActionBox />
                      <hr />
                      <IntransitActionBox />
                      <hr />
                  </div>
                </Grid.Column>
          </Grid>
          
          </div>
            <SignOut />
        </div>
        </div>

    );
  }
}
const DriverTransitPage = withDriverAuthorization(TransitPageBase);
export default DriverTransitPage;