const React = require("react");

function driverLoggedIn(props) {
    let bodyStyles = {
        textAlign: 'center',
        marginTop: '7%'
    };

    return(
        <html>
            <head>
                <title> Welcome </title>
                <link rel="stylesheet" href="/stylesheets/bootstrap.min.css" />
                <link rel="stylesheet" href="/stylesheets/style.css" />
            </head>

            <body style = {bodyStyles}>
                <h2> Welcome {props.username}</h2>

                <form action = "/searchRide" method = "POST">
                    <button type = "submit" className = "btn btn-lg btn-secondary"> Ready to pick up </button>
                </form>
            </body>
        </html>
    );
}

module.exports = driverLoggedIn;