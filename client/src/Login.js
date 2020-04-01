import React from "react";
import "./bootstrap.min.css";
import "./style.css";
import { DefaultLayout } from "./layouts/DefaultLayout.js";
import { RiderLoggedIn } from "./loggedInRider.js";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pwd: "",
            role: this.props.role,
            loggedIn: false,
            bodyStyles: {
                textAlign: 'center',
                marginLeft: '25% ',
                marginRight: '25% '
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.name === "email")
            this.setState({
               email: e.target.value
            });

        else
            this.setState({
                pwd: e.target.value
            });
    }

    handleSubmit(e) {
        fetch("/loginRider", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({"email": this.state.email, "password": this.state.pwd})
        })
            .then(res => res.text())
            .then((res) => {
                console.log(res);
            });
    }

    render() {
        if(!this.state.loggedIn) {
            return (
                <DefaultLayout>
                    <div className="main" style={this.state.bodyStyles}>
                        <h2> Login to your Account </h2>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label htmlFor="inputEmail" className="sr-only">Email</label>
                                <input name="email" type="email" id="inputEmail" className="form-control"
                                       placeholder="Email" onChange = {this.handleChange} required/>
                                <br/>

                                <label htmlFor="password" className="sr-only"> Password </label>
                                <input type="password" id="password" name="password" className="form-control"
                                       placeholder="Password" onChange={this.handleChange} required/>
                                <br/>

                                <button className="btn btn-primary" type="submit"> Login</button>
                                <br/>
                            </div>
                        </form>
                    </div>
                </DefaultLayout>
            );
        }

        else {
            return (
                <RiderLoggedIn />
            );
        }
    }
}

export {LoginForm};