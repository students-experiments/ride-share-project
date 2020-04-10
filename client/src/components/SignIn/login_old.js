import React from "react";
import { DefaultLayout } from "../../layouts/DefaultLayout.js";
import { RiderLoggedIn } from "../../loggedInRider.js";
import {loginUser }  from '../../firebase/firebase-auth';
import {myFirebase as firebase} from "../../firebase/init";
import { Route } from "react-router-dom";
import history from '../../history';
import axios from 'axios';
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            role: this.props.role,
            loggedIn: false,
            
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
                pass: e.target.value
            });
    }

    handleSubmit(e) {
        console.log("handling submit");
        

    }
    signInWithEmailAndPasswordHandler = (event) => {
        console.log(this.state.role);
        event.preventDefault();
        let res;
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
        .then((user)=>{
            console.log(user);
            res=axios.post(`http://localhost:5000/addUser`, { 'user': user.user })
            return res;
        })
        .then((res)=>{
            console.log(res);
            history.push('/rider/loggedIN');
        })
        .catch(error => {
          console.error("Error signing in with password and email", error);
        });
      };
      
    
    render() {
        const bodyStyles= {
            textAlign: 'center',
            marginLeft: '25% ',
            marginRight: '25% '
        }
            console.log("state",this.state.role)
            return (
                <div>
                    <DefaultLayout />
                    <section className="section-login" >
                        <h2> Login to your Account </h2>
                        <form >
                            <div>
                                <label htmlFor="inputEmail" className="sr-only">Email</label>
                                <input name="email" type="email" id="inputEmail" className="form-control"
                                        placeholder="Email" onChange = {this.handleChange} required/>
                                <br/>

                                <label htmlFor="password" className="sr-only"> Password </label>
                                <input type="password" id="password" name="password" className="form-control"
                                        placeholder="Password" onChange={this.handleChange} required/>
                                <br/>

                                <button className="btn btn-primary" type="submit" onClick={e => this.signInWithEmailAndPasswordHandler(e)}> Login</button>
                                <br/>
                            </div>
                        </form>
                    </section>
                </div>
            );
    }
}

export {LoginPage};