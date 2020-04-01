import React from "react";

class DefaultLayout extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>UIC Night Rider</title>
                    <link rel="stylesheet" href="/form-app/src/bootstrap.min.css"/>
                    <link rel="stylesheet" href="/form-app/src/style.css"/>
                </head>

                <body>
                    <div className = "header">
                        <h1>UIC Night Rider</h1>
                        <p> Hello {this.props.name} </p>
                    </div>
                    {this.props.children}
                </body>
            </html>
        );
    }
}

export { DefaultLayout };
