import React from "react";
import {Button} from "semantic-ui-react";
import * as Actions from "../../../actions/rider/RiderAPICalls";
import {withFirebase} from "../../Context";


class TransitMatched extends React.Component {
    constructor(props) {
        super(props);
        this.cancelRide = this.cancelRide.bind(this);
    }

    cancelRide() {
        const userObj = {
            uid: this.props.firebase.auth.currentUser.uid,
            role: 'rider',
            name: this.props.firebase.auth.currentUser.displayName
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
                <h1> You have been matched to {this.props.driverName} - {this.props.driverUID}</h1>
                <Button onClick = {this.cancelRide}> Cancel Ride </Button>
            </div>
        );
    }
}

export default withFirebase(TransitMatched);