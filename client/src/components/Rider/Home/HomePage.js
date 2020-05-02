import React from "react";
// import { Link } from "react-router-dom";
import { Button, Input,Segment,Grid,Header } from "semantic-ui-react";
import * as Actions from "../../../actions/rider/RiderAPICalls";
import * as ROUTES from "../../../constants/routes";
import { withRiderAuthorization } from "../../Sessions";
import SignOut from '../../SignOut/SignOutButton';
import GoogleMapsAutoComplete from  '../../Driver/Home/DriverLocationSerachAutocomplete'
import RiderLocationSearch from './RiderLocationSearchAutoComplete'
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class HomePageBase extends React.Component {

    constructor(props) {
        super(props);
        this.getLatLng=this.getLatLng.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.provideStart=this.provideStart.bind(this)
        this.provideEnd=this.provideEnd.bind(this);

        this.state = {
            style: {
                "margin": "auto"
            },
            mapsLoaded :false,
            startDesc: '',
            endDesc:''
        };
    }
    getLatLng(desc){
        return geocodeByAddress(desc)
        .then((results) => getLatLng(results[0]))
    
    }

    onSubmit(){
        // Make an axios post call to appropriate route and take rider to transit page
        let userObject = {
            uid: this.props.firebase.auth.currentUser.uid,
            role: 'rider',
            name: this.props.firebase.auth.currentUser.displayName
        };
        // let start, end;
        /*this.getLatLng(this.state.startDesc).then(res=> start=res)
        this.getLatLng(this.state.endDesc).then(res=> end=res)*/
        let requestObject;
        var promises=Promise.all([this.getLatLng(this.state.startDesc),this.getLatLng(this.state.endDesc)]);
        promises
        .then(res =>{
            let start= res[0]
            let end= res[1]
            requestObject= {
                start: {
                    latitude: start.lat,
                    longitude: start.lng
                },
                end: {
                    latitude: end.lat,
                    longitude: end.lng
                }
            };
            return requestObject

        }).then((requestObject)=>{
            return Actions.addCoordinates(userObject, requestObject);
        }).then((res) => {
            console.log("Sent rider locations",res);
            console.log(this.props.firebase.auth.currentUser);
            this.props.history.push(ROUTES.RIDER_TRANSIT );
        }).catch(err => err);
    }

    provideStart = (desc) => {
        this.setState({ startDesc: desc });
    };

    provideEnd = (desc) => {
    this.setState({ endDesc: desc });
    };

    componentDidMount() {
        if (!this.state.gmapsLoaded) {
          window.initMap = this.initMap;
          const gmapScriptEl = document.createElement(`script`);
          const apikey = process.env.REACT_APP_API_KEY;
          gmapScriptEl.src =
            "https://maps.googleapis.com/maps/api/js?key=" +
            apikey +
            "&libraries=places";
          document
            .querySelector(`body`)
            .insertAdjacentElement(`beforeend`, gmapScriptEl);
            this.setState({mapsLoaded:true})
        }
      }
    //protect these routes as mentioned in : https://www.robinwieruch.de/react-pass-props-to-component
  render() {
    return (

        <div>
            {this.state.mapsLoaded && (

            
                <Segment  style={{ padding: '0em 0em' }} vertical>
                    <Header as='h2' style={{ fontSize: '2em', textAlign: 'center' }}>
                    <p>  Set your Pick up and drop location. </p>
                    <p>   </p>
                    </Header>
                <Grid container stackable verticalAlign='middle' >
                <Grid.Row reversed='computer'>
                    <Grid.Column  width ={3} >
                        <SignOut />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column textAlign={"right"} width={5}>
                        <Header as='h4' style={{ fontSize: '2em' }}>
                        <p>  Pick Up Location </p>
                        </Header>
                    </Grid.Column>
                    <Grid.Column  width={7}>
                        <RiderLocationSearch provideDesc ={this.provideStart} placeholder={'Pick Up...'} />
                    </Grid.Column>
                    <Grid.Column  width ={3} >
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column textAlign={"right"} width={5}>
                        <Header as='h4' style={{ fontSize: '2em' }}>
                        <p>  Drop Off Location </p>
                        </Header>
                    </Grid.Column>
                    <Grid.Column  width={7}>
                        <RiderLocationSearch provideDesc ={this.provideEnd} placeholder={'Drop Off...'}/>
                    </Grid.Column>
                    <Grid.Column  width ={3} >
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Button primary compact onClick={this.onSubmit}>
                    Set Locations
                    </Button>
                </Grid.Row>
                </Grid>
                </Segment>
            )}
        </div>
        
    );
  }
}

const RiderHomePage = withRiderAuthorization(HomePageBase);
export default RiderHomePage;
