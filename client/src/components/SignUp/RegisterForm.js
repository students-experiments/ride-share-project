import React from "react";
import { Form, Button } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../Messages/InlineError";
import validator from "validator";
import {UIN_CHARACTER_LIMIT} from '../../constants/AppConstants'
import {withFirebase } from '../Context/context'
import {withRouter} from 'react-router-dom';

class RegisterFormBase extends React.Component {
    Initial={
      email: "",
      password: "",
      uin:"",
      role:""
    }
  state = {
    data: this.Initial,
    loading: false,
    errors: {}
  };
  resolve(err) {
    if(err.code === 'auth/weak-password'){
        return {password : err.message}
    }
    else {
        return {email : err.message}
    }
    
}

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
    

  onSubmit = e => {
    e.preventDefault();
    
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
        this.setState({ loading: true });
        //extract data from state.
        const {email, password} = this.state.data;
        const {role , uin}=this.state.data;
        // init claims
        const user_claims = {role : role, uin : uin}
        this.props.firebase
          .doCreateUserWithEmailAndPassword(email, password)
          .then(authUser => {
              console.log(authUser);
              this.setState({data : this.Initial});
              this.setState(({loading: false}))
              this.props
              .submit(authUser.user,user_claims)
          })
          .catch(err => {
            console.log(err);
            this.setState({ loading: false });
            this.setState({ errors : this.resolve(err)});
          });
    }
  };

  validate = data => {
    const errors = {};
    
    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    if (!data.uin) errors.uin="Can't be blank"
    if (!validator.isNumeric(data.uin)) errors.uin="Should be only  numbers"
    if (data.uin.length != UIN_CHARACTER_LIMIT) errors.uin = "Should exactly contain "+ UIN_CHARACTER_LIMIT+ " numbers"

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    {console.log(errors)}

    return (
        <div>
      <Form  onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.uin}>
            <label htmlFor= "uin">UIN</label>
            <input
            type="text"
            id="uin"
            name="uin"
            placeholder="12345678"
            value={data.uin}
            
            onChange={this.onChange}
          />
          {errors.uin && <InlineError text={errors.uin} />}
        </Form.Field>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@email.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make it secure"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Button secondary name="role" value="driver" onClick={this.onChange}>Register as Driver</Button>
        <Button primary name="role" value="rider" onClick={this.onChange}>Register as Rider</Button>

      </Form>
      </div>
    );
  }
}

const RegisterForm = withRouter(withFirebase(RegisterFormBase))
export default RegisterForm;