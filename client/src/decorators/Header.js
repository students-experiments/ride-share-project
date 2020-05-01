import React from "react";
import "../css/bootstrap.min.css";
import "../css/style.css";
import { Header  } from "semantic-ui-react";

class HeaderBase extends React.Component {
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
                     <Header as='h1' size ={'huge'} block color ='lue'  >
                        Block Header
                    </Header>
                    <div className = "app_header">
                        <h1>UIC Night Rider</h1>
                        <p> Hello {this.props.name} </p>
                    </div>

                </div>
        );
    }
}

export default HeaderBase;
