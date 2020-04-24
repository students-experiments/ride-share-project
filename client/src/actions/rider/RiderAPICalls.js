import * as Server from "../api/Requests";

export function addCoordinates(userObj, requestObj) {
    const data = {
        user: userObj,
        request: requestObj
    };

    return Server.post('rider/AddRide', data);
}
