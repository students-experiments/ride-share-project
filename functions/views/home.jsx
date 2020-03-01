var React = require('react');

function HomePage(props) {
    return (
        <html>
            <head>
                <title>UIC Night Rider</title>
                <link rel="stylesheet" href="/stylesheets/bootstrap.min.css" />
                <link rel="stylesheet" href="/stylesheets/style.css" />
            </head>

            <body>
                <div class="header">
                    <h1>UIC Night Rider</h1>
                    <p>Welcome to UIC ! We are here for your Safe Night Ride</p>
                </div>

                <div class = "main">
                    <form action = "/login-driver" method = "GET">
                        <button type = "submit" class = "btn btn-primary"> Login as Driver </button>
                    </form>

                    <form action = "/login-rider" method = "GET">
                        <button type = "submit" class = "btn btn-primary"> Login as Rider </button>
                    </form>

                    <form action = "/register-driver" method = "GET">
                        <button type = "submit" class = "btn btn-secondary"> Drivers Register Here </button>
                    </form>

                    <form action = "/register-rider" method = "GET">
                        <button type = "submit" class = "btn btn-secondary"> Riders Register Here </button>
                    </form>
                </div>
            </body>
        </html>
    );
}

module.exports = HomePage;