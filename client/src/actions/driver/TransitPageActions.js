
// import {firebase} from '../../firebase/init';
import * as Server from '../api/Requests';

/*{
    "data": {
  
        "user" :{
            "uid": "UJSLK06TrXZuB5SKGaQ86H1J8Ut2",
            "role": "driver"
        },
        "rider":{
          "uid":"Ad1I5WhVY1dfGUiPvRuJ3wLils12"
            
        }
        
    }
  }

  */
export function acceptRider(driverUID,riderUID, driverName, riderName){
    
    const data={
        user:{
            uid:driverUID,
            role: 'driver',
            name: driverName,
            riderName: riderName
        },
        rider:{
            uid: riderUID
        }
    }
    return Server.post('driver/AcceptRider',data)
    
}

export function cancelRider(driverUID, riderUID) {
    const data = {
        user: {
            uid: driverUID,
            role: 'driver'
        },
        rider: {
            uid: riderUID
        }
    };

    return Server.post('driver/CancelRide', data);
}

export function endRider(driverUID,riderUID, riderName){

    const data={
        user:{
            uid:driverUID,
            role: 'driver',
        },
        rider:{
            uid: riderUID,
            name: riderName
        }
    }
    return Server.post('driver/EndRide',data)
    
}
export function endTransit(driverUID){
    
    const data={
        user:{
            uid:driverUID,
            role: 'driver'
        }
    }
    return Server.post('driver/EndTransit',data)
    
}
