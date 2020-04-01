import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Link } from "react-router-dom";
import "./bootstrap.min.css";
import "./style.css";

import { DefaultLayout } from "./layouts/DefaultLayout.js";
import {LoginForm} from "./Login";
import {RegisterForm} from "./Register";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyStyles: {
                textAlign: 'center',
                marginLeft: '25% ',
                marginRight: '25% '
            },
            currentPage: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        this.setState({
            currentPage: e.target.name
        });
    }

    render() {
        return (
            <Router>
                <DefaultLayout>
                    <div className="main" style={this.state.bodyStyles}>
                        <Link to = "/driverLoginPage">
                            <button name="driverLogin" className= "btn btn-primary"> Login as Driver </button>
                        </Link>
                        <br />

                        <Link to = "/riderLoginPage">
                            <button name="riderLogin" className = "btn btn-primary"> Login as Rider </button>
                        </Link>
                        <br />

                        <Link to = "/driverRegisterPage">
                            <button name="driverRegister" className= "btn btn-secondary"> Drivers Register Here </button>
                        </Link>
                        <br />

                        <Link to = "/riderRegisterPage">
                            <button name="riderRegister" className = "btn btn-secondary"> Riders Register Here </button>
                        </Link>
                    </div>

                    <Switch>
                        <Route exact path = "/driverLoginPage">
                            <LoginForm role = "driver" />
                        </Route>

                        <Route exact path = "/riderLoginPage">
                            <LoginForm role = "rider" />
                        </Route>

                        <Route exact path = "/driverRegisterPage">
                            <RegisterForm role = "driver" />
                        </Route>

                        <Route exact path = "/riderRegisterPage">
                            <RegisterForm role = "rider" />
                        </Route>
                    </Switch>
                </DefaultLayout>
            </Router>
        );
    }
}

export { Home };