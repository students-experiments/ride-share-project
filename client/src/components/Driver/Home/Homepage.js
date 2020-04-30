import React from "react";
import { Button, Grid, Segment, Header, Container } from "semantic-ui-react";
import * as DriverHomeActions from "../../../actions/driver/HomePageActions";
import { withDriverAuthorization } from "../../Sessions";
import SignOut from "../../SignOut/SignOutButton";
import GoogleMapsAutoComplete from "./DriverLocationSerachAutocomplete";
import * as Actions from "../../../actions/driver/HomePageActions";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak

class HomePageBase extends React.Component {
  state = {
    readyLoading: false,
    addLocationLoading: false,
    locationAdded: false,
    errors: {},
    description: "",
  };
  provideDesc = (desc) => {
    this.setState({ description: desc });
  };

  onSubmit = () => {
    if (this.state.description) {
      console.log("result desc", this.state.description);
      geocodeByAddress(this.state.description)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          console.log("props in location", latLng);
          this.setState({ addLocationLoading: true });
          return Actions.addLocation(
            latLng.lat,
            latLng.lng,
            this.props.firebase.auth.currentUser
          )
        })
        .then((res) => {
          console.log("Added Location");
          this.setState({ locationAdded: true });
          this.setState({ addLocationLoading: false });
        })    
        .catch((err) => {
          console.log("err");
          this.setState({ addLocationLoading: false });
          this.setState({ errors: err });
        });
    }
  };

  readyToPick = (e) => {
    console.log(this.props);
    console.log(this.props.firebase.getFirebaseUser());
    this.setState({ readyLoading: true });
    DriverHomeActions.readyToPick(this.props.firebase.auth.currentUser)
      .then((res) => {
        console.log("ready to Pick");
        this.props.history.push("/driver/transit");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ readyLoading: false });
        this.setState({ errors: err });
      });
  };

  //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
  render() {
    var src= "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_API_KEY +
    "&libraries=places";
    return (
      <Segment style={{ padding: "0em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row reversed="computer">
            <Grid.Column width={3}>
              <SignOut />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            {!this.state.locationAdded && (
              <Grid.Column textAlign={"center"} width={8}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  <p> Add your starting Location. </p>
                </Header>
                <p>
                  {" "}
                  Currently we match riders based on your vehicle availabilty.{" "}
                </p>
                <p> By default its 4.</p>
              </Grid.Column>
            )}
            {this.state.locationAdded && (
              <div>
                <Grid.Column textAlign={"center"} width={8}>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    <p> Now you are all set. </p>
                  </Header>
                  <p> Click this when are ready to Go. </p>
                  <p> We will match a rider in a jiffy. </p>
                </Grid.Column>
              </div>
            )}
          </Grid.Row>

          <Grid.Row centered>
            {!this.state.locationAdded && (
              <Grid.Column width={8}>
                
                <GoogleMapsAutoComplete
                  provideDesc={this.provideDesc}
                  loading={this.state.addLocationLoading}
                />
                <div>
                  <Button secondary compact onClick={this.onSubmit}>
                    Add Location
                  </Button>
                </div>
              </Grid.Column>
            )}

            {this.state.locationAdded && (
              <Grid.Column textAlign="center" width={9}>
                <Button
                  primary
                  onClick={this.readyToPick}
                  loading={this.state.readyLoading}
                >
                  Ready To Pick Up{" "}
                </Button>
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
        
      </Segment>
    );
  }
}

const DriverHomePage = withDriverAuthorization(HomePageBase);
export default DriverHomePage;
