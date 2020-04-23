import React from "react";
import { Form, Button, Grid,Segment } from "semantic-ui-react";
import AddLocationForm from './AddLocationForm'
import SignOut from '../../SignOut/SignOutButton';
import { withDriverAuthorization } from "../../Sessions";
import * as DriverActions from '../../../actions/driver/HomePageActions'

// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class HomePageBase extends React.Component {
  state = {
    ReadyLoading: false,
    errors: {}
  };
   
    readyToPick = e => {
      this.setState({ReadyLoading:true});
      DriverActions.readyToPick(this.props.firebase.auth.currentUser).then((res)=>{
        this.props.userId=this.props.firebase.auth.currentUser.uid
        this.props.history.push('/driver/transit');
      })
      .catch((err)=>{
        this.setState({ReadyLoading:false});
        this.setState({errors:err});
      })
      
    }
    
    //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
  render() {
    //console.log('props:',this.props.firebase.auth.currentUser.uid)
    
    return (
      
        <div >
          <div className="ui container">
            <div className="ui grid container">
                <Grid columns={2} relaxed='very' stackable>
                <Grid.Column >
                <AddLocationForm textAlign ="center"/>
                  </Grid.Column>
                  <Grid.Column textAlign ="center" verticalAlign = "bottom">
                  <Button primary onClick={this.readyToPick} loading ={this.state.ReadyLoading} >Ready To Pick Up </Button>
                  
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

