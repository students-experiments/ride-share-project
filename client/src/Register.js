import React from "react";
import { DefaultLayout } from "./layouts/DefaultLayout.js";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            uin: "",
            email: "",
            pwd: "",
            confPwd: "",
            bodyStyles: {
                textAlign: "center"
            },
            role: this.props.role,
            formStyles: {
                margin: "0 auto",
                width: "50%"
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        if (this.state.pwd !== this.state.confPwd) {
            alert("Passwords don't match");
            e.preventDefault();
        }
    }

    handleChange(e) {
        if(e.target.name === "username")
            this.setState({
                username: e.target.value
            });

        else if(e.target.name === "uin")
            this.setState({
                uin: e.target.value
            });

        else if(e.target.name === "email")
            this.setState({
                email: e.target.value
            });

        else if(e.target.name === "pwd")
            this.setState({
                pwd: e.target.value
            });

        else if(e.target.name === "confPwd")
            this.setState({
                confPwd: e.target.value
            });
    }

    render() {
        return (
            <DefaultLayout>
                <div style = {this.state.bodyStyles}>
                    <h2 className="h3 mb-3 font-weight-normal"> Create Your Account </h2>
                    <form onSubmit = {this.handleSubmit} className="form-signin"
                          method="POST" style = {this.state.formStyles}>

                        <label htmlFor="username" className="sr-only">Username</label>
                        <input name="username" type="text" id="username" className="form-control"
                               placeholder="Username" onChange = {this.handleChange} required/>

                        <label htmlFor="uin" className="sr-only">UIN</label>
                        <input name="uin" type="text" id="uin" className="form-control" placeholder="UIN"
                               onChange = {this.handleChange} required/>

                        <label htmlFor="inputEmail" className="sr-only">Email</label>
                        <input name="email" type="email" id="inputEmail" className="form-control"
                               placeholder="Email" onChange = {this.handleChange} required/>

                        <label htmlFor="pwd" className="sr-only">Password</label>
                        <input name="pwd" type="password" id="pwd" className="form-control" placeholder="Password"
                               onChange = {this.handleChange} required/>

                        <label htmlFor="confPwd" className="sr-only">Confirm Password</label>
                        <input name="confPwd" type="password" id="confPwd" className="form-control"
                               placeholder="Confirm Password" onChange = {this.handleChange} required/>

                        <button className="btn btn-lg btn-primary" type="submit">Sign Up</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
                    </form>
                </div>
            </DefaultLayout>
        );
    }
}

export { RegisterForm };