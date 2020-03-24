var React = require('react');
var DefaultLayout =require('./layouts/defaults');
var LoginForm =require('./layouts/defaultLoginForm');
function assignMethod(role){
    if(role==='rider'){
        return '/loginRider'
    }else{
        return '/loginDriver';
    }
}
function Login(props) {
  let bodyStyles = {
    textAlign: 'center',
    marginLeft: '25% ',
    marginRight: '25% '

  };

  let formStyles = {
    margin: '0 auto',
    width: '50%'
  };

  return(
      <DefaultLayout >
        <div class = "main" style ={bodyStyles}>
          <h2> Login to your Account </h2>
          <LoginForm method={assignMethod(props.role)} role = {props.role}></LoginForm>
        </div>
      </DefaultLayout>
    );
  }

module.exports = Login;