import React from "react";
import { withFirebase } from "../Context";
import { AuthUserContext } from "./context";
import { withRouter } from "react-router-dom";

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: ''
            };
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
                <AuthUserContext.Consumer>
                {authUser =>
                   <Component {...this.props} authUser= {authUser} /> 
                }
              </AuthUserContext.Consumer>
            );
        }
    }

    return withRouter(withFirebase(WithAuthentication));
};

export default withAuthentication;