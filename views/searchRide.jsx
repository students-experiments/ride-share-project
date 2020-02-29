const React = require("react");

function riderLoggedIn(props) {
    let formStyles = {
        textAlign: 'center',
        margin: '7% auto',
        width: '30%'
    };

    return(
        <html>
            <head>
                <title> Search Ride </title>
                <link rel="stylesheet" href="/stylesheets/bootstrap.min.css" />
                <link rel="stylesheet" href="/stylesheets/styleHome.css" />
            </head>

            <body>
                <form action = "/processSearch" style = {formStyles} method = "POST">
                    <label for = "src" class = "sr-only"> Enter your Source </label>
                    <input type = "text" name = "src" id = "src" class = "form-control" placeholder = "Source" />

                    <label for = "dst" class = "sr-only"> Enter your destination </label>
                    <input type = "text" name = "dst" id = "dst" class = "form-control" placeholder = "Destination" />

                    <button type = "submit" class = "btn btn-dark"> Search </button>

                </form>
            </body>
        </html>
    );
}

module.exports = riderLoggedIn;