import React from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import * as Actions from '../../../actions/driver/HomePageActions';
import { withFirebase } from '../../Context/context';
import InlineError from "../../messages/InlineError";


class AddLocationFormBase extends React.Component {
  state = {
    data: {
        latitude: "" ,
        longitude: ""
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
    console.log('props in location',this.props);

    this.setState({ errors });
    this.setState({loading: true});
    Actions.addLocation(this.state.data.latitude,
      this.state.data.longitude,
      this.props.firebase.auth.currentUser)
      .then((res)=>{
        console.log('Added Location')
        this.setState({loading: false});
      })
      .catch((err)=>{
        console.log('err');
        this.setState({loading: false});
        this.setState({errors: err})
      })

  };

  validate = data => {
    const errors = {};
    if (data.latitude > 180 ) errors.latitude = "latitude cannot be greater than 180 ";
    if (data.longitude > 180) errors.longitude = "Invalid cannot be greater than 180 ";
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
        <Form.Group widths='equal'>
        <Form.Field error={!!errors.latitude}>
        <label htmlFor="latitude">latitude</label>
        <Input 
            
            type="number"
            id="latitude"
            name="latitude"
            placeholder="199.0"
            value={data.latitude}
            
            onChange={this.onChange}
          />
         {errors.latitude && <InlineError text={errors.latitude} />}
        </Form.Field>

        <Form.Field error={!!errors.longitude}>
        <label htmlFor="longitude">longitude</label>
        <input
            type="number"
            id="longitude"
            name="longitude"
            placeholder="199.0"
            value={data.longitude}
            
            onChange={this.onChange}
          />
         {errors.longitude && <InlineError text={errors.longitude} />}
        </Form.Field>
        </Form.Group>
        <Button secondary compact  fluid >Add Location</Button>
      </Form> 
    );
  }
}

const AddLocationForm = withFirebase(AddLocationFormBase);

export default AddLocationForm;