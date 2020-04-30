import React from "react";
import {Button} from "semantic-ui-react";
import * as Actions from "../../../actions/rider/RiderAPICalls";
import {withFirebase} from "../../Context";

/*const TransitMatched = (props) => {
    return (
        <h1> You have been matched to {props.driverUID} </h1>
    );
};*/

class TransitMatched extends React.Component {
    constructor(props) {
        super(props);
        this.cancelRide = this.cancelRide.bind(this);
    }

    cancelRide() {
        const userObj = {
            uid: this.props.firebase.auth.currentUser.uid,
            role: 'rider'
        };

        Actions.deleteRide(userObj)
            .then(res => {
                console.log("Ride deleted successfully");
            })
            .catch(err => err);
    }
    render() {
        return (
            <div>
                <h1> You have been matched to {this.props.driverUID}</h1>
                <Button onClick = {this.cancelRide}> Cancel Ride </Button>
            </div>
        );
    }
}

export default withFirebase(TransitMatched);