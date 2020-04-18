import React from "react";
// import { Link } from "react-router-dom";
// import { Form, Button, Message } from "semantic-ui-react";
import {withFirebase } from '../../Context/context'
import SignOut from '../../SignOut/SignOutButton';

// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class HomePageBase extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);

        
    }
    submit(data){
     
    }
    //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
  render() {
    this.props.firebase.auth.currentUser.getIdTokenResult()
      .then((idTokenResult) => {
     // Confirm the user is an Admin.
      console.log('claims',idTokenResult.claims)
      // actual : this.props.history.push(resolveUser
      })
    return (
      
        
       <div className="ui search">
        <div className="ui icon input">
            <input className="prompt" type="text" placeholder="Search countries..."/>
            <i className="search icon"></i>
        </div>
       <div className="results"></div>
       <SignOut />
   </div>
    );
  }
}
const RiderHomePage = withFirebase(HomePageBase)
export default RiderHomePage;