var React = require('react');
var DefaultLayout=require('../views/layouts/defaults');
const users = require('../firebase-db/auth/Users.js/index.js');
function formHandler (){
    
        data= {
            "email": this.refs.email.value,
            "pass":password,
            "role":"driver"
        }
    users.loginUser({data}).then(console.log("success"));

}
function HomePageDriver(props) {
    
    return(

        <DefaultLayout name={props.name}>
                

                <div class = "main">
                    <h2> Login to your Account </h2>
                    <form >
                        <label for="inputEmail" class = "sr-only">Email</label>
                        <input name = "email" type="email" id = "inputEmail" class = "form-control"  ref="email" placeholder = "Email" required />
                        <br />
                        <label for = "password" class = "sr-only"> Password </label>
                        <input type = "password" id = "password" name = "password" class = "form-control" ref="pass" placeholder = "Password"/>
                        <br />
                        
                        <button class = "btn btn-primary" type = "submit" onClick={this.formHandler}> Login </button><br />
                        
                    </form>
                </div>
        </DefaultLayout>
    );
}

module.exports = HomePageDriver;