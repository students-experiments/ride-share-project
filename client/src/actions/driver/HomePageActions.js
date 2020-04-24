
// import {firebase} from '../../firebase/init';
import {postUserClaims} from '../api/UserRequests';
import * as Utils from '../utils';
import * as Server from '../api/Requests';

export function addLocation(latitude,longitude,user){
    
    const data={
        user:{
            uid:user.uid,
            role: 'driver'
        },
        location :{
            latitude : latitude,
            longitude: longitude
        }
    }
    return Server.post('driver/AddLocation',data)
    
}
export function readyToPick(user){
    
    const data={
        user:{
            uid:user.uid,
            role: 'driver'
        }
    }
    return Server.post('driver/ReadyToPick',data)
    
}
