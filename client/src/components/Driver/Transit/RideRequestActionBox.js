import React from "react";
import { Button, Message, Segment } from "semantic-ui-react";
import * as DriverTransitActions from '../../../actions/driver/TransitPageActions';
import SegmentLoader from './SegmentLoader';
import {withFirebase} from "../../Context";

class RideRequestActionBox extends React.Component {
  state = {
    data: {
        riderUID :this.props.riderUID,
        riderName : this.props.riderName,
        driverUID: this.props.driverUID
    },
    loading:false,
    errors:{}
  };

  onAcceptRide = () => {
    console.log(this.props)
    console.log("this.state",this.state.data.riderUID)
    this.setState({loading:true})
    DriverTransitActions.acceptRider(this.state.data.driverUID, this.state.data.riderUID, this.props.firebase.auth.currentUser.displayName, this.state.data.riderName)
    .then(()=>
    this.setState({loading:false}))
    .catch((err)=>{
      this.setState({loading:false})
      this.setState({ errors : {global: err.message}});
    })
  };

  render() {
    const { loading,errors } = this.state;
      console.log("From rider action box");
      console.log(this.state.data.riderUID);
    return (
      <Segment>
            <div class="item" >
              { loading &&  <SegmentLoader />
              }
               {errors.global && (
          <Message negative>
            <Message.Header
            style={{
              color: 'white'
            }}>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
              
                <div class="ui small image">
                    <img src="https://via.placeholder.com/150" alt="rider"/>
                </div>

                    <div class="description">
                        <p
                        style={{
                          color: 'white'
                        }}>Rider UID: {this.state.data.riderUID} </p>
                        <p
                        style={{
                          color: 'white'
                        }}>Rider Name: {this.state.data.riderName}</p>
                    </div>
                    <div class="extra">
                        <Button  positive onClick ={this.onAcceptRide}>
                            Accept Ride 
                            <i class="right user add icon"></i>
                        </Button>
                    </div>
                
            </div>
      </Segment>


    );
  }
}

export default withFirebase(RideRequestActionBox);
