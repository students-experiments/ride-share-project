var React = require('react');

function HomePageDriver(props) {
    
    return(
        <html>
            <head>
                <title>UIC Night Rider</title>
                <link rel="stylesheet" href="/stylesheets/bootstrap.min.css" />
                <link rel="stylesheet" href="/stylesheets/styleHome.css" />
            </head>

            <body>
                <div class="header">
                    <h1>UIC Night Rider</h1>
                    <p>Welcome to UIC ! We are here for your Safe Night Ride</p>
                </div>

                <div class = "main">
                    <h2> Login to your Account </h2>
                    <form action = "/" method = "POST">
                        <label for = "username" class = "sr-only"> Username </label>
                        <input type = "text" id = "username" name = "username" class = "form-control" placeholder = "Username"/>
                        <br />
                        <label for = "password" class = "sr-only"> Password </label>
                        <input type = "password" id = "password" name = "password" class = "form-control" placeholder = "Password"/>
                        <br />

                        <button class = "btn btn-primary" type = "submit"> Login </button><br />
                    </form>
                </div>
            </body>
        </html>
    );
}

module.exports = HomePageDriver;