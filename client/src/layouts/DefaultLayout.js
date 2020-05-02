import React from "react";
import "../css/bootstrap.min.css";
import "../css/style.css";
import {withFirebase} from "../components/Context";

class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.firebase.auth.currentUser ? this.props.firebase.auth.currentUser.displayName : ''
        };
    }

    render() {
        return (
                <div>
                    <div className = "header">
                        <h1>UIC Night Rider</h1>
                        <p> Hello {this.state.name} </p>
                    </div>

                </div>
        );
    }
}

export default withFirebase(DefaultLayout);
