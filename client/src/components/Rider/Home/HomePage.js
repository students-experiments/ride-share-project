import React from "react";
// import { Link } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";
import RiderTransitPage from "../transit/transit";
import SignOut from '../../SignOut/SignOutButton';
import { withRiderAuthorization } from "../../Sessions";

// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class HomePageBase extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.addCoordinates = this.addCoordinates.bind(this);
        this.state = {
            // For src and dest end points
            start: '',
            end: ''
        }
    }

    addCoordinates(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit(data){
        // Take rider to transit page
    }
    //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
  render() {
    return (
        
       <div className="ui search">
        <div className="ui icon input">
            <input name = "start" className = "prompt" type="text" placeholder="Enter start point"
                   onChange = {this.addCoordinates} />
            <br />
            <input name = "end" type="text" className = "prompt" placeholder = "Enter end point "
                   onChange = {this.addCoordinates} />

            <Button type= "submit" onClick = {this.submit}> Add location </Button>
            {/*<i className="search icon"></i>*/}
        </div>
       <div className="results"></div>
       <SignOut />
   </div>
    );
  }
}
const RiderHomePage = withRiderAuthorization(HomePageBase);
export default RiderHomePage;
