import React from "react";
import { withFirebase } from "../Context";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const withDriverAuthorization = (Component) => {
    class WithDriverAuthorization extends React.Component {
        constructor(props) {
            super(props);
            this.redirect = this.redirect.bind(this);
        }

        redirect(targetPage) {
            if (targetPage === "login")
                this.props.history.push(ROUTES.LOG_IN);
            else this.props.history.push(ROUTES.RIDER_HOME);
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
                let currentUser = this.props.firebase.auth.currentUser;

                if (currentUser) {
                    currentUser.getIdTokenResult()
                        .then((token) => {
                            console.log(token.claims);
                            if (token.claims.role !== 'driver') {
                                console.log("Unauthorized user for this page\n");

                                this.redirect("home");
                            }
                        })
                        .catch(err => err);
                }

                else {
                    console.log("No user is logged in");
                    this.redirect("login");
                }
            });
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    }
    return withRouter(withFirebase(WithDriverAuthorization));
};

export default withDriverAuthorization;
