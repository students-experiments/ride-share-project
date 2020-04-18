import React from "react";
import * as ROUTES from "../../constants/routes";
import { withRouter} from "react-router-dom";
import {withFirebase} from "../Context";
import {AuthUserContext} from "./context";

const withRiderAuthorization =
    (Component) => {
        class WithRiderAuthorization extends React.Component {

            constructor(props) {
                super(props);
                this.redirect = this.redirect.bind(this);
            }

            redirect(targetPage) {
                if (targetPage === "login")
                    this.props.history.push(ROUTES.LOG_IN);
                else this.props.history.push(ROUTES.DRIVER_HOME);
            }

            componentDidMount() {
                this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
                    let currentUser = this.props.firebase.auth.currentUser;
                    if (currentUser) {
                        currentUser.getIdTokenResult()
                            .then((token) => {
                                console.log(token.claims);
                                if (token.claims.role !== 'rider') {
                                    console.log("Unauthorized user for this page\n");

                                    this.redirect("home");
                                }
                            })
                            .catch(err => err);
                    } else {
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
                    /*<AuthUserContext.Consumer>
                        {authUser => authUser ? <Component {...this.props} /> : null}
                    </AuthUserContext.Consumer>*/
                    <Component {...this.props} />
                );
            }
        }

        return withRouter(withFirebase(WithRiderAuthorization));
    };

export default withRiderAuthorization;
