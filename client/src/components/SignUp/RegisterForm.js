import React from "react";
import { Form, Button, Grid } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";
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
    if (data.uin.length !== UIN_CHARACTER_LIMIT) errors.uin = "Should exactly contain "+ UIN_CHARACTER_LIMIT+ " numbers"

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
        <div>
          <Grid className="center aligned">
      <Form  onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.uin}>
            <label htmlFor= "uin"
            style={{
              color: 'white',
              textAlign: 'center'
            }}>UIN</label>
            <Form.Input
            style={{
              width: '100%',
              display: "block",
              textAlign: 'center'
            }}
            type="text"
            id="uin"
            name="uin"
            placeholder="12345678"
            maxWidth="20rem"
            value={data.uin}
            onChange={this.onChange}
          />
          {errors.uin && <InlineError text={errors.uin} />}
        </Form.Field>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email"
          style={{
            color: 'white',
            textAlign: 'center'
          }}>Email</label>
          <Form.Input
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
          <label htmlFor="password"
          style={{
            color: 'white',
            textAlign: 'center'
          }}>Password</label>
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

        <Button secondary name="role" value="driver" onClick={this.onChange}
        >Register as Driver</Button>
        <Button primary name="role" value="rider" onClick={this.onChange}>Register as Rider</Button>

      </Form>
      </Grid>
      </div>
    );
  }
}

const RegisterForm = withRouter(withFirebase(RegisterFormBase))
export default RegisterForm;