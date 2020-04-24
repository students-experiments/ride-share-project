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
        this.submit = this.submit.bind(this);
        this.state = {
            matchMade: false,
            inTransit: false,
        };
    }

    submit(data){
     
    }

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged((authUser) => {
            if (authUser) { // Only if a user is logged in, otherwise current user will be null
                let currentUser = this.props.firebase.auth.currentUser;
                console.log('user', currentUser.uid);

                this.props.firebase.firestore.collection('rider').doc(this.props.firebase.auth.currentUser.uid)
                    .onSnapshot(function (doc) {
                        console.log("Current data: ", doc.data());
                    });
            }
        });
      }

    //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
    render() {
        if (!this.state.matchMade)
            return (
                <div>
                    <TransitMain/>
                    <br />
                    <SignOut />
                </div>
            );

        else if (this.state.matchMade && !this.state.inTransit)
            return (
                <div>
                    <TransitMatched />
                    <br />
                    <SignOut />
                </div>
            );

        else if (this.state.inTransit)
            return (
                <div>
                    <TransitFinal />
                    <br />
                    <SignOut />
                </div>
            );
    }
}

const RiderTransitPage = withRiderAuthorization(RiderTransitPageBase);
export default RiderTransitPage;