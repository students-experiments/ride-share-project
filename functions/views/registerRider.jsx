const React = require('react');
var DefaultLayout=require('./layouts/defaults');
function riderRegistration(props) {
    let bodyStyles = {
        textAlign: 'center'
    };

    let formStyles = {
        margin: '0 auto',
        width: '50%'
    };

    return (
        <DefaultLayout>
            <div style = {bodyStyles}>
                <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h2 class="h3 mb-3 font-weight-normal"> Create Your Account </h2>
                <form action = "/register-and-login-rider" class="form-signin" method = "POST" style = {formStyles}>

                    <label for="username" class="sr-only">Username</label>
                    <input name = "username" type="text" id="username" class="form-control" placeholder="Username" required />

                    <label for = "uin" class = "sr-only">UIN</label>
                    <input name = "uin" type = "text" id = "uin" class = "form-control" placeholder = "UIN" required/>

                    <label for="inputEmail" class = "sr-only">Email</label>
                    <input name = "email" type="email" id = "inputEmail" class = "form-control" placeholder = "Email" required />

                    <label for = "pwd" class = "sr-only">Password</label>
                    <input name = "pwd" type = "password" id = "pwd" class = "form-control" placeholder = "Password" required />
                    
                    <label for = "confPwd" class = "sr-only">Confirm Password</label>
                    <input name = "confPwd" type = "password" id = "confPwd" class = "form-control" placeholder = "Confirm Password" required />

                    <div class="checkbox mb-3">
                        <input type="checkbox" id = "rememberMe" value="remember-me" />
                        <label for = "rememberMe"> Remember Me </label>
                    </div>

                    <button class="btn btn-lg btn-primary" type="submit">Sign Up</button>
                    <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
                </form>
            </div>
        </DefaultLayout>
    );
}

module.exports = riderRegistration;