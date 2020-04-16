// Common constants to both Rider and Driver
module.exports.LOCATION ='location'
module.exports.STATUS ='status'
// takes input( '/driver',uid) => /driver/uid
module.exports.referenceJoiner = function(...args){
    const path=args.filter(Boolean).join("/").trim()
    console.log('path:',path)
    return path;
}

module.exports.REQUEST = 'request'
module.exports.TRANSIT = 'transit'



// Driver Constansts
module.exports.DRIVER ='driver'
module.exports.DRIVER_LOCATION_REF = this.referenceJoiner(' ',this.DRIVER);
module.exports.DRIVER_DEFAULT_CAPACITY = 4;
module.exports.DRIVER_ACCEPTED_RIDERS = 'transit_riders'
module.exports.DRIVER_FOUND_MATCHES = 'matched_riders'
module.exports.VEHICLE_MIN_CAPACITY = 1


// Rider constants
module.exports.RIDER ='rider'