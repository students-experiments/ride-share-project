import React from "react";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
// If you want to use the provided css
/*
This component Loads the Seacrh Bar with Auto complete.

references:
Package: https://www.npmjs.com/package/react-google-places-autocomplete
Github ReadMe: https://github.com/Tintef/react-google-places-autocomplete#readme

Examples code snippets help to understand the usage.

*/
import "react-google-places-autocomplete/dist/index.min.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Segment, Grid } from "semantic-ui-react";

class GoogleMapsAutoComplete extends React.Component {
  state = {
    gmapsLoaded: false,
    description: "",
  };

  componentDidMount() {
    if (!this.state.gmapsLoaded) {
      window.initMap = this.initMap;
      const gmapScriptEl = document.createElement(`script`);
      const apikey = process.env.REACT_APP_API_KEY;
      gmapScriptEl.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        apikey +
        "&libraries=places&callback=initMap";
      document
        .querySelector(`body`)
        .insertAdjacentElement(`beforeend`, gmapScriptEl);
    }
  }

  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    });
  };
  handleSelect = (result) => {
    console.log("handling select: ", result.description);
    this.setState({ description: result.description });
    this.props.provideDesc(result.description);
  };



  render() {

    return (
      <div>

        < Segment style={{ padding: '3em 0em' }} vertical active={this.props.loading}>
          {this.state.gmapsLoaded && (
             <Grid>
             <Grid.Row >
                <GooglePlacesAutocomplete
                  required={true}
                  value={this.state.address}
                  onChange={this.handleChange}
                  placeholder={"My Location"}
                  onSelect={this.handleSelect}
                />
              </Grid.Row>
             
              </Grid>
          )}
           
        </Segment>
      </div>
    );
  }
}

//const AddLocationForm = withFirebase(AddLocationFormBase);

export default GoogleMapsAutoComplete;
