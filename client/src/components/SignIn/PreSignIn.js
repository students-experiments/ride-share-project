import React from "react";
import { Loader ,Container} from "semantic-ui-react";
//import { withFirebase } from '../Context/context';
import { withAuthentication } from "../Sessions";
import * as ROUTES from "../../constants/routes";
// class structure documentation:
// https://github.com/Remchi/bookworm-react/tree/9fe352164ce287d29b9ca3440267a17c041d7fa1
// video: https://www.youtube.com/watch?v=RCPMuJ0zYak


class PreSignInBase extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user : ''
        };
        this.redirectHome = this.redirectHome.bind(this);
        this.redirectLogin = this.redirectLogin.bind(this);
    }
    redirectHome(user) {

        if(user.role === 'rider'){
            this.props.history.push(ROUTES.RIDER_HOME)
        }
        else if(user.role === 'driver' ){
            this.props.history.push(ROUTES.DRIVER_HOME)
        }
        else {
            this.redirectLogin();
        }
    }
    redirectLogin(){
        this.props.history.push(ROUTES.LOG_IN);
    }

    
    componentDidMount(){
        this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
            let currentUser = this.props.firebase.auth.currentUser;
            if (currentUser) {
                currentUser.getIdTokenResult()
                    .then((token) => {
                        console.log(token.claims);
                        this.redirectHome(token.claims);
                    })
                    .catch(err => err);
            } else {
                console.log("No user is logged in");
                this.redirectLogin();
            }
        });

    }
    render() {
        const user=this.state;
        return(
            <div>
                <Container >
                    <Loader active/>
                </Container>
            </div>
        )
    }


    
 
}
const PreSignIn = withAuthentication(PreSignInBase);
export default PreSignIn;
