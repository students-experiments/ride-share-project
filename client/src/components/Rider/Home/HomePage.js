import React from "react";
// import { Link } from "react-router-dom";
import { Form, Button, Message, Input } from "semantic-ui-react";
import * as ROUTES from "../../../constants/routes";
import SignOut from '../../SignOut/SignOutButton';
import { withRiderAuthorization } from "../../Sessions";
import * as Actions from "../../../actions/rider/RiderAPICalls";

// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class HomePageBase extends React.Component {

    constructor(props) {
        super(props);
        this.addCoordinates = this.addCoordinates.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            style: {
                "textAlign": "center",
                "margin": "auto"
            },
            startLon: '',
            startLat: '',
            endLon: '',
            endLat: ''
        };
    }

    addCoordinates(e) {
        this.setState({
            [e.target.name]: Number(e.target.value)
        })
    }

    submit(e){
        // Make an axios post call to appropriate route and take rider to transit page
        let userObject = {
            uid: this.props.firebase.auth.currentUser.uid,
            role: 'rider'
        };

        let requestObject = {
            start: {
                latitude: this.state.startLat,
                longitude: this.state.startLon
            },
            end: {
                latitude: this.state.endLat,
                longitude: this.state.endLon
            }
        };

        /*axios.post("http://localhost:5001/uic-rider/us-central1/app/rider/AddRide", {
            data: {
                user: userObject,
                request: requestObject
            }
        })*/
        Actions.addCoordinates(userObject, requestObject)
            .then((res) => {
                console.log("Sent rider locations");
                this.props.history.push(ROUTES.RIDER_HOME + '/transit');
            })
            .catch(err => err);
    }


    //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
  render() {
    return (

       <div style = {this.state.style}>
           <table>
               <tr>
                   <td><Input name = "startLon" className = "prompt" type="text" placeholder="Enter start longitude"
                              onChange = {this.addCoordinates} /></td>
                   <td><Input name = "startLat" className = "prompt" type = "text" placeholder = "Enter start latitude"
                              onChange = {this.addCoordinates} /></td>
               </tr>
               <br />

               <tr>
                   <td><Input name = "endLon" type="text" className = "prompt" placeholder = "Enter end longitude "
                              onChange = {this.addCoordinates} /></td>
                   <td><Input name = "endLat" type="text" className = "prompt" placeholder = "Enter end latitude "
                              onChange = {this.addCoordinates} /></td>
               </tr>

               <tr>
                   <td><Button type= "submit" onClick = {this.submit}> Add location </Button></td>
                   <td><SignOut /></td>
               </tr>
           </table>
       </div>
    );
  }
}
const RiderHomePage = withRiderAuthorization(HomePageBase);
export default RiderHomePage;
