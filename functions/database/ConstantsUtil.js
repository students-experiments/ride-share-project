// Common constants to both Rider and Driver
module.exports.LOCATION ='location'
module.exports.STATUS ='status'
// takes input( '/driver',uid) => /driver/uid
module.exports.referenceJoiner = function(...args){
    const path=args.filter(Boolean).join("/").trim()
    console.log('path:',path)
    return path;
}



// Driver Constansts
module.exports.DRIVER ='driver'
module.exports.DRIVER_LOCATION_REF = this.referenceJoiner(' ',this.DRIVER);




// Rider constants
module.exports.RIDER ='rider'