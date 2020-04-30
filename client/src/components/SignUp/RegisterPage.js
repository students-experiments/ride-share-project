import React from "react";
import RegisterForm from "./RegisterForm";
import {addCustomClaims} from '../../actions/user/auth';
import {withFirebase } from '../Context/context'
import {withRouter} from 'react-router-dom';

class RegisterPageBase extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
   
    submit(user,claims){
        console.log("profile",user);
        console.log("history",this.props.history);
        console.log('user claims',claims)
        addCustomClaims(user,claims).then(()=>{
            this.props.history.push('/');
        }).catch((err)=>{
            console.log('was not able to login. try again');
            console.log(err);
            this.props.firebase.doDeleteUser()
            .then(()=>{
              alert('was not able to login. try again')
            }).catch((err)=>{
            console.log("error occure diring delteion", err);
          })
        })
        
       

       

    }
  render() {
    return (
      <div>
            <section className="section-login" >
                <h2> Register your Account </h2>
                    <RegisterForm  submit={this.submit} />
            </section>
      </div>
    );
  }
}


const RegisterPage = withRouter(withFirebase(RegisterPageBase))
export default RegisterPage;