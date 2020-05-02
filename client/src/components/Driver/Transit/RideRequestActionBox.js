import React from "react";
import { Button, Message, Segment } from "semantic-ui-react";
import * as DriverTransitActions from '../../../actions/driver/TransitPageActions';
import SegmentLoader from './SegmentLoader';

class RideRequestActionBox extends React.Component {
  state = {
    data: {
        riderUID :this.props.riderUID,
        riderName : 'Unknown',
        driverUID: this.props.driverUID
    },
    loading:false,
    errors:{}
  };


  onAcceptRide = () => {
    console.log(this.props)
    console.log("this.state",this.state.data.riderUID)
    this.setState({loading:true})
    DriverTransitActions.acceptRider(this.state.data.driverUID,this.state.data.riderUID)
    .then(()=>
    this.setState({loading:false}))
    .catch((err)=>{
      this.setState({loading:false})
      this.setState({ errors : {global: err.message}});
    })
  };

  render() {
    const { loading,errors } = this.state;

    return (
      <Segment>
            <div class="item" >
              { loading &&  <SegmentLoader />
              }
               {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
              
                <div class="ui small image">
                    <img src="https://via.placeholder.com/150" alt="rider"/>
                </div>

                    <div class="description">
                        <p>Rider UID: {this.state.data.riderUID} </p>
                        <p>Rider Name: {this.state.data.riderName}</p>
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

export default RideRequestActionBox;