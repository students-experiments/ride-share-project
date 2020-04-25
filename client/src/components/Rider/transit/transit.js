import React from "react";
// import { Link } from "react-router-dom";
// import { Form, Button, Message } from "semantic-ui-react";
import SignOut from '../../SignOut/SignOutButton';
import { withRiderAuthorization } from "../../Sessions";
import TransitMain from "./transitMain";
import TransitMatched from "./transitMatched";
import TransitFinal from "./transitFinal";

// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class RiderTransitPageBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            riderStatus: 'available',
            driverID: ''
        };
    }

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                this.props.firebase.firestore.collection('rider').doc(this.props.firebase.auth.currentUser.uid)
                    .onSnapshot(function (doc) {
                        console.log("Current data: ", doc.data());
                        this.setState({
                            riderStatus: doc.data().status
                        });
                        if (this.state.riderStatus !== 'available')
                            this.setState({
                                driverID: doc.data().matched_driver
                            });
                    }.bind(this));
            }
        });
    }

    //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
    render() {
        if (this.state.riderStatus === 'available')
            return (
                <div>
                    <TransitMain />
                    <br />
                    <SignOut />
                </div>
            );

        else if (this.state.riderStatus === 'matched')
            return (
                <div>
                    <TransitMatched driverUID = {this.state.driverID} />
                    <br />
                    <SignOut />
                </div>
            );

        else if(this.state.riderStatus === 'transit')
            return (
                <div>
                    <TransitFinal driverUID = {this.state.driverID} />
                    <br />
                    <SignOut />
                </div>
            );
    }
}

const RiderTransitPage = withRiderAuthorization(RiderTransitPageBase);
export default RiderTransitPage;