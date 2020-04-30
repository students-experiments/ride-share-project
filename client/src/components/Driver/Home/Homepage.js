import React from "react";
import { Button, Grid } from "semantic-ui-react";
import * as DriverHomeActions from '../../../actions/driver/HomePageActions';
import { withDriverAuthorization } from "../../Sessions";
import SignOut from '../../SignOut/SignOutButton';
import AddLocationForm from './AddLocationForm';
import GoogleMapsAutoComplete from  './GoogleMapsAutocomplete'

// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class HomePageBase extends React.Component {
  state = {
    ReadyLoading: false,
    errors: {}
  };
   
    readyToPick = e => {
      console.log(this.props)
      console.log(this.props.firebase.getFirebaseUser())
      this.setState({ReadyLoading:true});
      DriverHomeActions.readyToPick(this.props.firebase.auth.currentUser)
      .then((res)=>{
        
        console.log('ready to Pick')
        this.props.history.push('/driver/transit');
      })
      .catch((err)=>{
        console.log(err)
        this.setState({ReadyLoading:false});
        this.setState({errors:err});
      })
      
    }
    
    //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
  render() {
    
    
    return (
      
        <div >
          <div className="ui container">
            <div className="ui grid container">
                <Grid columns={3} relaxed='very'>
                <Grid.Column >
                <AddLocationForm textAlign ="center"/>
                  </Grid.Column>
                  <Grid.Column textAlign ="center" verticalAlign = "bottom">
                  <Button primary onClick={this.readyToPick} loading ={this.state.ReadyLoading} >Ready To Pick Up </Button>
                  
                  </Grid.Column>
                  <Grid.Column>
                    <GoogleMapsAutoComplete />
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

