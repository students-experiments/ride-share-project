import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import { withFirebase } from "../../Context";
import * as Actions from "../../../actions/rider/RiderAPICalls";
import * as ROUTES from "../../../constants/routes";

class TransitMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchMade: null,
            transitComplete: this.props.transitComplete
        };
        this.requestRide = this.requestRide.bind(this);
    }

    requestRide() {
        // Make an axios post call to appropriate rider router route
        let userObj = {
            uid: this.props.firebase.auth.currentUser.uid,
            role: 'rider',
            name: (this.props.firebase.auth.currentUser.displayName ? this.props.firebase.auth.currentUser.displayName : '')
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

        return (
            <div>
                <Grid className="center aligned"style={{
                    padding:'5rem',
                }}>
                <Button onClick = {this.requestRide}
                > Request Ride </Button>

                <Link to = {ROUTES.RIDER_HOME + '/home'}>
                    <Button> Update Coordinates </Button>
                </Link>
                </Grid>
            </div>
        );
    }
}

export default withFirebase(TransitMain);
