import React from "react";
// import { Link } from "react-router-dom";
 import { Form, Button, Grid,Segment,Divider } from "semantic-ui-react";
import {withFirebase } from '../../Context/context'
import SignOut from '../../SignOut/SignOutButton';
import {withRouter} from 'react-router-dom';
import RideRequestActionBox from './RideRequestActionBox'
import IntransitActionBox from './InTransitActionBox'
// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class TransitPageBase extends React.Component {

    constructor(props) {
        super(props);
        this.state={
          transitRidersList : [],
          matchedRidersList:[],
          uid : "7zSvNOSLt1QKXNO3SuIHxKvi40E3"//this.props.firebase.auth.currentUser.uid
        }
       
        
        this.submit = this.submit.bind(this);
        
       
        
    }
    /*

    Firestore Data snapshot:
    https://firebase.google.com/docs/firestore/quickstart#web_1

    https://firebase.google.com/docs/firestore/query-data/listen

    https://www.robinwieruch.de/react-state-array-add-update-remove


    The following code is a placeholder for the realtime update of the driver Side.
    */
    
    componentDidMount() {
      this.setState({ loading: true });
      this.props.firebase.firestore.collection('driver').doc(this.state.uid)
      .onSnapshot((doc) =>{
        console.log(doc.data())
        if(doc.data().matched_riders)
          this.setState({ matchedRidersList: doc.data().matched_riders})
        if(doc.data().transit_riders)
          this.setState({ transitRidersList:doc.data().transit_riders})

    });
    
    }
   
    submit(data){
     
    }
    
    //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
  render() {
    return (
        <div >
<<<<<<< HEAD
          <div className="ui container">
          <div className="ui grid container">
=======
          {console.log('list',this.transitList)}
          <div class="ui container">
          <div class="ui grid container">
>>>>>>> d610db519804a3558367f592184eeda838b5ae85
              <Grid columns={2} relaxed='very' stackable>
              <Grid.Column >
              <div className="ui segment">

<<<<<<< HEAD
              <h2 className="ui orange center aligned header">Ride Requests</h2>
=======
              <h2 class="ui orange center aligned header">Ride Requests</h2>
                <div class="ui divided items">
                    {this.state.matchedRidersList.map(uid => {
                            
                            return <RideRequestActionBox riderUID ={uid}  />
                          })}
                </div>
>>>>>>> d610db519804a3558367f592184eeda838b5ae85

              </div>
              
                </Grid.Column>
                <Grid.Column >
                  <div class="ui segment">

                    <h2 class="ui olive center aligned header">In Transit</h2>
                    <p> {this.state.transitRidersList.length}</p>

                    {this.state.transitRidersList.map(transitRiderUID => {
                      console.log('uid',transitRiderUID)
                      return <IntransitActionBox riderUID ={transitRiderUID}  />
                    })}
                    {/* <IntransitActionBox />
                      <hr />
                      <IntransitActionBox />
                      <hr />
                      <IntransitActionBox />
                      <hr />
                      <IntransitActionBox />
                      <hr /> */}
                  </div>
                </Grid.Column>
          </Grid>
          
          </div>
           
        </div>
        <SignOut />
        </div>

    );
  }
}
const DriverTransitPage = withDriverAuthorization(TransitPageBase);
export default DriverTransitPage;