import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";
import "./style.css";

import { DefaultLayout } from "./layouts/DefaultLayout";
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
            currentPage: "home"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        this.setState({
            currentPage: e.target.name
        });
    }

    render() {
        if(this.state.currentPage === "home")
        return (
            <DefaultLayout>
                <form name = "driverLoginPage" onSubmit={this.handleSubmit} style = {this.state.bodyStyles}>
                    <button type = "submit" className="btn btn-primary" > Login as Driver </button>
                </form>

                <form name = "riderLoginPage" onSubmit={this.handleSubmit} style = {this.state.bodyStyles}>
                    <button type = "submit" className="btn btn-primary"> Login as Rider</button>
                </form>

                <form name = "driverRegisterPage" onSubmit={this.handleSubmit} style = {this.state.bodyStyles}>
                    <button type="submit" className="btn btn-secondary"> Drivers Register Here</button>
                </form>

                <form name = "riderRegisterPage" onSubmit={this.handleSubmit} style = {this.state.bodyStyles}>
                    <button type="submit" className="btn btn-secondary"> Riders Register Here</button>
                </form>
            </DefaultLayout>
        );

        else if(this.state.currentPage === "driverLoginPage")
            return (
                <LoginForm role = "driver" />
            );

        else if(this.state.currentPage === "riderLoginPage")
            return (
                <LoginForm role = "rider" />
            );

        else if(this.state.currentPage === "driverRegisterPage")
            return (
                <RegisterForm role = "driver" />
            );

        else if(this.state.currentPage === "riderRegisterPage")
            return (
                <RegisterForm role = "rider" />
            );
    }
}

ReactDOM.render(
    <Home />,
    document.getElementById("root")
);