import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";
import validator from "validator";
import {UIN_CHARACTER_LIMIT} from '../../constants/AppConstants'
class RegisterForm extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
      uin:"",
      role:""
    },
    loading: false,
    errors: {}
  };

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
      this.props
        .submit(this.state.data)
        //ADD CATCH
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

    return (
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
    );
  }
}


export default RegisterForm;