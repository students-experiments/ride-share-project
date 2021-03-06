import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";
import {withFirebase } from '../Context/context'
import { Link } from "react-router-dom";


class LoginFormBase extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      const {email, password} = this.state.data;
      this.props.firebase
          .doSignInWithEmailAndPassword(email, password)
          .then(authUser => {
              console.log(authUser);
              this.props
              .submit(authUser.user)
          })
          .catch(err => {
            console.log(err);
            this.setState({ loading: false });
            this.setState({ errors : {global: err.message}});
          });
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (

      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <Form.Input
            type="email"
            id="email"
            icon='user'
            iconPosition='left'
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <Form.Input
            type="password"
            icon='lock'
            iconPosition='left'
            id="password"
            name="password"
            placeholder="Make it secure"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
        
        <Link to="/forgot_password">Forgot Password?</Link>
      </Form>
    );
  }
}

const LoginForm = withFirebase(LoginFormBase);

export default LoginForm;