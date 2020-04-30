import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { withFirebase } from "../../Context";
import * as Actions from "../../../actions/rider/RiderAPICalls";
import * as ROUTES from "../../../constants/routes";

const TransitMessage = (props) => {
    if (props.transitComplete)
        return (
            <h2> Your ride has ended! </h2>
        );
    else return (<h2></h2>);
};

const MatchMessage = (props) => {
    if (props.matchMade === false)
    return (
        <h2> Sorry no drivers available at the moment. Try again after a few minutes. </h2>
    );
    else return (<h2></h2>);
}

class TransitMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchMade: null,
            transitComplete: this.props.transitComplete
        };
        this.requestRide = this.requestRide.bind(this);
        this.cancelRide = this.cancelRide.bind(this);
    }

    cancelRide() {
        const userObj = {
            uid: this.props.firebase.auth.currentUser.uid,
            role: 'rider'
        };
        Actions.deleteRide(userObj)
            .then(res => {
                console.log("Deleted ride request successfully");
                this.setState({
                    matchMade: null
                });
            })
            .catch(err => err);
    }

    requestRide() {
        // Make an axios post call to appropriate rider router route
        let userObj = {
            uid: this.props.firebase.auth.currentUser.uid,
            role: 'rider'
        };

        Actions.findMatch(userObj)
            .then((res) => {
                this.setState({
                    matchMade: true,
                    transitComplete: false
                });
            })
            .catch(err => {
                this.setState({
                    matchMade: false,
                    transitComplete: false
                });
            });
    }

    render() {
        const invalid = this.state.matchMade !== null;
        return (
            <div>
                <TransitMessage transitComplete = {this.state.transitComplete} />
                <MatchMessage matchMade = {this.state.matchMade} />
                <Button onClick = {this.requestRide}> Request Ride </Button>

                <Link to = {ROUTES.RIDER_HOME + '/home'}>
                    <Button> Update Coordinates </Button>
                </Link>

                <Button disabled = {invalid} onClick = {this.cancelRide}> Cancel Ride </Button>
            </div>
        );
    }
}

export default withFirebase(TransitMain);
