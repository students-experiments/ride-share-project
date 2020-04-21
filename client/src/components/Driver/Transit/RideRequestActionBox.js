import React from "react";
import { Form, Button, Message,Input,Divider } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../../messages/InlineError";
import {withFirebase } from '../../Context/context'



class RideRequestActionBox extends React.Component {
  state = {
    data: {
        latitude: "" ,
        longitude: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    console.log(this.state.data);
    this.setState({ errors });
    

  };

  validate = data => {
    const errors = {};
    if (data.latitude > 180 ) errors.latitude = "latitude cannot be greater than 180 ";
    if (data.longitude > 180) errors.longitude = "Invalid cannot be greater than 180 ";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
        <div class="ui divided items">
            <div class="item">
                <div class="ui small image">
                    <img src="https://via.placeholder.com/150"/>
                </div>
                <div class="right aligned content">
                    <a class=" header">Rider</a>
                
                    <div class="description">
                        <p>Rider UID: </p>
                        <p>Rider Name: </p>
                    </div>
                    <div class="extra">
                        <div class="ui right floated primary button">
                            Accept Ride
                            <i class="right chevron icon"></i>
                        </div>
                    </div>
                </div>
                
            </div>
          </div>


    );
  }
}

export default RideRequestActionBox;