import React from "react";

class DefaultLayout extends React.Component {
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

export { DefaultLayout };
