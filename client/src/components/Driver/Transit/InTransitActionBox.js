import React from "react";
import { Form, Button, Message,Input,Divider } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../../messages/InlineError";
import {withFirebase } from '../../Context/context'



class IntransitActionBox extends React.Component {
  state = {
    data: {
        riderUid :this.props.riderUID,
        riderName : 'Rider Name is unknown'
    }
  };

  render() {

    return (
        <div class="ui divided items">
            <div class="item">
                <div class="ui small image">
                    <img src="https://via.placeholder.com/150"/>
                </div>
                <div class="right aligned content">
                    <a class=" header">Rider</a>
                
                    <div class="description">
                        <p>Rider UID: {this.state.data.riderUID}</p>
                        <p>Rider Name: </p>
                    </div>
                    <div class="extra">
                        <div class="ui middle floated secondary button">
                            End Ride
                        </div>
                    </div>
                </div>
            </div>
          </div>


    );
  }
}

export default IntransitActionBox;