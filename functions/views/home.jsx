var React = require('react');
var DefaultLayout=require ('./layouts/defaults');
function HomePage(props) {
    let bodyStyles = {
        textAlign: 'center',
        marginLeft: '25% ',
        marginRight: '25% '
    
    };
    
    let formStyles = {
        margin: '0 auto',
        width: '50%'
    };
    return (

        <DefaultLayout >
            <div class = "main" style={bodyStyles}>
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
        </DefaultLayout>
    );
}

module.exports = HomePage;