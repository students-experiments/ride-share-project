import React from "react";
import { withFirebase } from "../Context";
import { AuthUserContext } from "./context";
import { withRouter } from "react-router-dom";

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            
            
        }

        componentWillUnmount() {
            // this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
            //     console.log('auth piece auth user',authUser)
            //     authUser ? this.setState({authUser: authUser}) : this.setState({authUser: null});
            // });
            // this.listener();
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    }

    return withRouter(withFirebase(WithAuthentication));
};

export default withAuthentication;