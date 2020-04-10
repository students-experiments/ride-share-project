import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import { DefaultLayout } from "../../layouts/DefaultLayout.js";
// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        
    }
    // under construction needs work
    submit(data){
      this.props.login(data).then(() => this.props.history.push("/dashboard"));
    }
    
  render() {
    return (
        
        <div>
            {console.log(this.props.role)}
        <DefaultLayout />
        <section className="section-login" >
            <h2> Login to your Account </h2>
        <LoginForm submit={this.submit} />
        

        <Link to="/forgot_password">Forgot Password?</Link>
      </section>
      </div>
    );
  }
}

export default LoginPage;