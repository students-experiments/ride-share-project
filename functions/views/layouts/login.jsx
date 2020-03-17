
var React = require('react');
var PropTypes = require('prop-types');
function LoginLayout(props) {
  return (
            <form action = {props.method} method = "POST">
            <div>
                <label for="inputEmail" class = "sr-only">Email</label>
                    <input name = "email" type="email" id = "inputEmail" class = "form-control" placeholder = "Email" required />
                    <br />
                    <label for = "password" class = "sr-only"> Password </label>
                    <input type = "password" id = "password" name = "password" class = "form-control" placeholder = "Password"/>
                    <br />

                    <button class = "btn btn-primary" type = "submit"> Login </button><br />
            </div>
            </form>
  );
}
LoginLayout.propTypes = {
    name: PropTypes.string,
  };
module.exports = LoginLayout;