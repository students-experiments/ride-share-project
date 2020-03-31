import React from 'react';

import { DefaultLayout } from '../../layouts/DefaultLayout';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import {LoginForm} from "../SignIn/login";
import {RegisterForm} from "../../register";

// not being used

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyStyles: {
                textAlign: 'center',
                marginLeft: '25% ',
                marginRight: '25% '
            },
            currentPage: "home"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        this.setState({
            currentPage: e.target.name
        });
    }

//     render(){
// return(

//         <BrowserRouter>
//         <div>
//           <Route exact={true} path='/' render={() => (
//             <div className="App">
//               <Home />
//             </div>
//           )}/>
//           {/* <Route exact={true} path='/signin' render={() => (
//             <div className="App">
//               <SignIn />
//             </div>
//           )}/>
//           <Route exact={true} path='/signup' render={() => (
//             <div className="App">
//               <SignUp />
//             </div>
//           )}/> */}
//         </div>
//       </BrowserRouter>
    
//     )
//         }
    render() {
        console.log(this.state.currentPage);
        if(this.state.currentPage === "home")
        return (
            <div>
            <DefaultLayout />
        
                <div style={this.state.bodyStyles}>
                    <button type = "submit" className="btn btn-primary" onClick={this.state.currentPage}> Login as Driver </button>
                </div>
                <form name = {ROUTES.RIDER_LOG_IN}onSubmit={this.handleSubmit} style = {this.state.bodyStyles}>
                    <button type = "submit" className="btn btn-primary"> Login as Rider</button>
                </form>

                <form name = {ROUTES.DRIVER_REGISTER} onSubmit={this.handleSubmit} style = {this.state.bodyStyles}>
                    <button type="submit" className="btn btn-secondary"> Drivers Register Here</button>
                </form>

                <form name = {ROUTES.RIDER_REGISTER} onSubmit={this.handleSubmit} style = {this.state.bodyStyles}>
                    <button type="submit" className="btn btn-secondary"> Riders Register Here</button>
                </form>
            </div>
            
        );

        else if(this.state.currentPage === ROUTES.DRIVER_LOG_IN)
            return (
                <LoginForm role = {ROLES.DRIVER_ROLE} />
            );

        else if(this.state.currentPage === ROUTES.RIDER_LOG_IN)
            return (
                <LoginForm role = {ROLES.RIDER_ROLE}  />
            );

        else if(this.state.currentPage === ROUTES.DRIVER_REGISTER)
            return (
                <RegisterForm role = {ROLES.DRIVER_ROLE}/>
            );

        else if(this.state.currentPage === ROUTES.RIDER_REGISTER)
            return (
                <RegisterForm role = {ROLES.RIDER_ROLE} />
            );
        
    }
}



