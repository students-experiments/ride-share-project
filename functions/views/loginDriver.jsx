var React = require('react');

function HomePageDriver(props) {
    
    return(
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
                    <h2> Login to your Account </h2>
                    <form action = "/loginDriver" method = "POST">
                        <label for="inputEmail" class = "sr-only">Email</label>
                        <input name = "email" type="email" id = "inputEmail" class = "form-control" placeholder = "Email" required />
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