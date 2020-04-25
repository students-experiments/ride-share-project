import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { withFirebase } from "../../Context";
import * as Actions from "../../../actions/rider/RiderAPICalls";
import * as ROUTES from "../../../constants/routes";

class TransitMain extends React.Component {
    constructor(props) {
        super(props);
        this.requestRide = this.requestRide.bind(this);
    }

    requestRide() {
        // Make an axios post call to appropriate rider router route
        let userObj = {
            uid: this.props.firebase.auth.currentUser.uid,
            role: 'rider'
        };

        Actions.findMatch(userObj)
            .then((res) => {
                console.log("You are matched with a driver");
            })
            .catch(err => err);
    }

    /*componentDidMount() {
        this.props.firebase.firestore.collection('rider').doc(this.props.firebase.auth.currentUser.uid)
            .onSnapshot(function (doc) {
                console.log("Current data: ", doc.data());
                this.props.pageStatus("matched");
            });
        /!*let riderStatus = "available";
        this.props.firebase.auth.onAuthStateChanged((authUser) => {
            if (authUser) { // Only if a user is logged in, otherwise current user will be null
                let currentUser = this.props.firebase.auth.currentUser;
                console.log('user', currentUser.uid);

                this.props.firebase.firestore.collection('rider').doc(this.props.firebase.auth.currentUser.uid)
                    .onSnapshot(function (doc) {
                        console.log("Current data: ", doc.data());
                        this.props.pageStatus("matched");
                    });
                console.log("Current rider status is " + riderStatus);
            }
        });*!/
    }*/

    render() {
        return (
            <div>
                <Button onClick = {this.requestRide}> Request Ride </Button>

                <Link to = {ROUTES.RIDER_HOME + '/home'}>
                    <Button> Update Coordinates </Button>
                </Link>
            </div>
        );
    }
}

export default withFirebase(TransitMain);
