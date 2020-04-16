const admin = require("../../init-db").firebase_admin;
const geo = require('geofirex').init(admin);

// Returns the GeoPoint of the following format:
/*
Point: {
    point:{
            lat: lat,
            long: long
    }  
    hash: hash

}

*/
module.exports.getGeoPoint = function(lat,long){
    return geo.point(lat,long);
}