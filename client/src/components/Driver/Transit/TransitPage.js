import React from "react";
// import { Link } from "react-router-dom";
import { Button, Container, Grid } from "semantic-ui-react";
import * as DriverTransitActions from "../../../actions/driver/TransitPageActions";
import { withDriverAuthorization } from "../../Sessions";
import SignOut from "../../SignOut/SignOutButton";
import IntransitActionBox from "./InTransitActionBox";
import RideRequestActionBox from "./RideRequestActionBox";

// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak

class TransitPageBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transitRidersList: [],
      transitRidersNamesList: [],
      matchedRidersList: [],
      matchedRidersNamesList: [],
      riderMapper: {},
      driverUID: this.props.firebase.auth.currentUser
        ? this.props.firebase.auth.currentUser.uid
        : null,
      listener: "",
    };

    this.onEndTransit = this.onEndTransit.bind(this);
  }
  /*

    Firestore Data snapshot:
    https://firebase.google.com/docs/firestore/quickstart#web_1

    https://firebase.google.com/docs/firestore/query-data/listen

    https://www.robinwieruch.de/react-state-array-add-update-remove


    The following code is a placeholder for the realtime update of the driver Side.
    */

  mapUidToName(old_matched_rider_names, new_matched_rider_names, old_rider_uids, new_rider_uids) {
    let newRiderName = '', newRiderUID = '', newMapper = {};
    new_rider_uids.map(riderUID => {

      if (!(riderUID in old_rider_uids)) {
        newRiderUID = riderUID;
      }
      return;
    });

    new_matched_rider_names.map(riderName => {
      if (!(riderName in old_matched_rider_names)) {
        newRiderName = riderName;
      }
      return;
    });


    for (let i = 0; i < new_rider_uids.length; i += 1)
      newMapper[new_rider_uids[i]] = new_matched_rider_names[i];

    console.log(new_rider_uids);
    console.log(new_matched_rider_names);
    console.log(newMapper);

    this.setState({
      riderMapper: newMapper
    });
    console.log(this.state.riderMapper);
  }

  componentDidMount() {
    console.log("props", this.props);
    this.setState({ loading: true });
    if (this.state.driverUID) {
      this.listener = this.props.firebase.firestore
        .collection("driver")
        .doc(this.state.driverUID)
        .onSnapshot((doc) => {
          console.log(doc.data());
          if (doc.data().matched_riders) {
            let new_matched_riders_names = doc.data().matched_rider_names;
            let new_matched_riders_uids = doc.data().matched_riders;

            this.mapUidToName(this.state.matchedRidersNamesList, new_matched_riders_names, this.state.matchedRidersList, new_matched_riders_uids);

            this.setState({matchedRidersList: new_matched_riders_uids, matchedRidersNamesList: new_matched_riders_names });
          }
          else this.setState({matchedRidersList: []});

          if (doc.data().transit_riders) {
            this.setState({transitRidersList: doc.data().transit_riders, transitRidersNamesList: doc.data().transit_rider_names});
          }
        });
    }
  }

  onEndTransit = () => {
    console.log(this.props);
    DriverTransitActions.endTransit(this.state.driverUID)
      .then(() => {
        if (this.state.listener) {
          this.state.listener();
        }
        this.props.history.push("/driver/home");
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.setState({ errors: { global: err.message } });
      });
  };

  //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
  render() {

    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <h2 class="ui orange center aligned header">Ride Requests</h2>
              <div class="ui divided items">
                {this.state.matchedRidersList.map((riderUID) => {
                  console.log("From transit page");
                  console.log(riderUID);
                  return (
                    <RideRequestActionBox
                      riderUID={riderUID}
                      riderName = {this.state.riderMapper[riderUID]}
                      driverUID={this.state.driverUID}
                    />
                  );
                })
                }
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <h2 class="ui olive center aligned header">In Transit</h2>

              {this.state.transitRidersList.map((riderUID) => {
                console.log("uid", riderUID);
                return (
                  <IntransitActionBox
                    riderUID={riderUID}
                    riderName = {this.state.riderMapper[riderUID]}
                    driverUID={this.state.driverUID}
                  />
                );
              })}
            </Grid.Column>
            <Grid.Column width={3}>
              <SignOut />
              <Button secondary onClick={this.onEndTransit}>
                End Transit
                <i class="right remove icon"></i>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
const DriverTransitPage = withDriverAuthorization(TransitPageBase);
export default DriverTransitPage;
