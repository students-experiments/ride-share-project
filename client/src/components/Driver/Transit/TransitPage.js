import React from "react";
// import { Link } from "react-router-dom";
 import { Form, Button, Grid,Segment,Divider, Container } from "semantic-ui-react";
import {withFirebase } from '../../Context/context'
import SignOut from '../../SignOut/SignOutButton';
import {withRouter} from 'react-router-dom';
import { withDriverAuthorization } from "../../Sessions";
import RideRequestActionBox from './RideRequestActionBox'
import IntransitActionBox from './InTransitActionBox'
import * as DriverTransitActions from '../../../actions/driver/TransitPageActions'

// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class TransitPageBase extends React.Component {

    constructor(props) {
        super(props);
        this.state={
          transitRidersList : [],
          matchedRidersList:[],
          driverUID : this.props.firebase.auth.currentUser.uid
        }
        this.onEndTransit = this.onEndTransit.bind(this);
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
      this.props.firebase.firestore.collection('driver').doc(this.state.driverUID)
      .onSnapshot((doc) =>{
        console.log(doc.data())
        if(doc.data().matched_riders)
          this.setState({ matchedRidersList: doc.data().matched_riders})
        if(doc.data().transit_riders)
          this.setState({ transitRidersList:doc.data().transit_riders})

    });
    
    }
   
    onEndTransit = () => {
      console.log(this.props)
      DriverTransitActions.endTransit(this.state.driverUID)
      .then(()=>
      this.props.history.push('/driver/home')
      )
      .catch((err)=>{
        this.setState({loading:false})
        this.setState({ errors : {global: err.message}});
      })
    };
    
    //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
  render() {
    return (
          
      <Container >
      <Grid relaxed='very' >
         <Grid.Row>
            <Grid.Column width={6}>
                  <h2 class="ui orange center aligned header">Ride Requests</h2>
                  <div class="ui divided items">
                     {this.state.matchedRidersList.map(riderUID => {
                     return <RideRequestActionBox riderUID ={riderUID} driverUID= {this.state.driverUID} />
                     })}
                  </div>
            </Grid.Column>
            <Grid.Column width={6}>
               
                  <h2 class="ui olive center aligned header">In Transit</h2>
                  
                  {this.state.transitRidersList.map(riderUID =>  {
                  console.log('uid',riderUID)
                  return <IntransitActionBox riderUID ={riderUID} driverUID= {this.state.driverUID}  />
                  })}
               
            </Grid.Column>
            <Grid.Column width={3} >
               <SignOut />
               <Button secondary onClick={this.onEndTransit}> 
                    End Transit
                  <i class ='right remove icon'></i>
               </Button>
            </Grid.Column>
         </Grid.Row>
      </Grid>
   </Container>
   

    );
  }
}
const DriverTransitPage = withDriverAuthorization(TransitPageBase);
export default DriverTransitPage;