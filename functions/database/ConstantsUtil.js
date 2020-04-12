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



// Rider constants
module.exports.RIDER ='rider'