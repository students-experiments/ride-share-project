import React from "react";
import "../css/bootstrap.min.css";
import "../css/style.css";

class Header extends React.Component {
    render() {
        return (
                <div>
                    <div className = "header">
                        <h1>UIC Night Rider</h1>
                        <p> Hello {this.props.name} </p>
                    </div>

                </div>
        );
    }
}

export default Header;
