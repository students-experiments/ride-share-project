import React from "react";
import { Form, Button, Message,Input,Divider, Loader,Dimmer, Segment } from "semantic-ui-react";
import SegmentLoader from './SegmentLoader'
import * as DriverTransitActions from '../../../actions/driver/TransitPageActions'


class IntransitActionBox extends React.Component {
  state = {
    data: {
      riderUID :this.props.riderUID,
      riderName : 'Unknown',
      driverUID: this.props.driverUID
    },
    loading:false,
    errors:{}
  };

  onEndRider = () => {
    console.log(this.props)
    console.log("this.state",this.state.data.riderUID)
    this.setState({loading:true})
    DriverTransitActions.endRider(this.state.data.driverUID,this.state.data.riderUID)
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
                    <img src="https://via.placeholder.com/150"/>
                </div>
                <div >
                
                    <div class="description">
                    <p>Rider UID: {this.state.data.riderUID} </p>
                        <p>Rider Name: {this.state.data.riderName}</p>
                    </div>
                    <div class="extra">
                        <Button negative onClick={this.onEndRider}>
                            End Ride
                            <i class="right user delete icon"></i>
                        </Button>
                    </div>
                </div>
            </div>
          </Segment>


    );
  }
}

export default IntransitActionBox;