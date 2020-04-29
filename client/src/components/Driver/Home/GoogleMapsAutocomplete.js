import React from "react";
import { Button, Form, Input, Message, Loader } from "semantic-ui-react";
import * as Actions from '../../../actions/driver/HomePageActions';
import { withFirebase } from '../../Context/context';
import InlineError from "../../messages/InlineError";
import GooglePlacesAutocomplete ,{getLatLng,geocodeByAddress} from 'react-google-places-autocomplete';
import 'semantic-ui-css/semantic.min.css';
// If you want to use the provided css

/*
This component Loads the Seacrh Bar with Auto complete.

references:
Package: https://www.npmjs.com/package/react-google-places-autocomplete
Github ReadMe: https://github.com/Tintef/react-google-places-autocomplete#readme

Examples code snippets help to understand the usage.

*/
import 'react-google-places-autocomplete/dist/index.min.css';
class GoogleMapsAutoComplete extends React.Component {
  state = {
    gmapsLoaded: false,
    pickup : '',
    drop: ''
  };


  componentDidMount () {
    window.initMap = this.initMap
    const gmapScriptEl = document.createElement(`script`)
    const apikey=process.env.REACT_APP_API_KEY
    gmapScriptEl.src ="https://maps.googleapis.com/maps/api/js?key=" + apikey +"&libraries=places&callback=initMap";
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
  }
  
  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }
  handleSelect = result => {
    console.log('result desc',result.description);
    this.setState({ pickup: result.description });
    geocodeByAddress(result.description)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    

    return (
    <div>        
        <div>{this.state.gmapsLoaded && (
            <GooglePlacesAutocomplete
            loader = {<Loader />}
            required = {true}
            
            value={this.state.address}
            onChange={this.handleChange}
            placeholder = {"My Location"}
            onSelect={this.handleSelect}

            />)}
        </div>
      </div>
    );
  }
}

//const AddLocationForm = withFirebase(AddLocationFormBase);

export default GoogleMapsAutoComplete;