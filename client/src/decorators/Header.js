import React from "react";
import "../css/bootstrap.min.css";
import "../css/style.css";
import { Header  } from "semantic-ui-react";
import { withFirebase} from "../components/Context";

class HeaderBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.firebase.auth.currentUser ? this.props.firebase.auth.currentUser.displayName : ''
        };
    }

    render() {
        return (
                <div>
                    {/* import { Header  } from 'semantic-ui-react'
                    {/* <Header as='h1' 
                    color ='blue' 
                    size = 'large'
                    block>
                        Block Header
                    </Header> */} 
                     <Header as='h1' size ={'huge'} block color ='blue'  >
                        Block Header
                    </Header>
                    <div className = "app_header">
                        <h1>UIC Night Rider</h1>
                        <p> Hello {this.state.name} </p>
                    </div>

                </div>
        );
    }
}

export default withFirebase(HeaderBase);
