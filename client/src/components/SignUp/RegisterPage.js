import React from "react";
import PropTypes from "prop-types";

import RegisterForm from "./RegisterForm";
import { DefaultLayout } from "../../layouts/DefaultLayout.js";
import {signUp} from '../../actions/user/auth'
import history from '../../history';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
   
    submit(data){
        signUp(data).then(() => history.push("/login")).catch((err)=>{
    
        console.log(err)
    }
        );

    }
  render() {
    return (
      <div>
            <DefaultLayout />
            <section className="section-login" >
                <h2> Register your Account </h2>
                <RegisterForm submit={this.submit} />
            </section>
      </div>
    );
  }
}



export default RegisterPage;