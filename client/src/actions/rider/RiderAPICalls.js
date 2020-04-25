import * as Server from "../api/Requests";

export function addCoordinates(userObj, requestObj) {
    const data = {
        user: userObj,
        request: requestObj
    };

    return Server.post('rider/AddRide', data);
}

export function findMatch(userObj) {
    const data = {
        user: userObj
    };

    return Server.post('rider/FindMatch', data);
}