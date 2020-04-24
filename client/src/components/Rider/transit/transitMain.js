import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { withFirebase } from "../../Context";
import * as ROUTES from "../../../constants/routes";
import axios from "axios";

class TransitMain extends React.Component {
    constructor(props) {
        super(props);
        this.requestRide = this.requestRide.bind(this);
    }

    requestRide() {
        // Make an axios post call to appropriate rider router route

    }

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