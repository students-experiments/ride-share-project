// In this we will make use of the GEO fireX for getting the drivers within some radious

// https://github.com/codediodeio/geofirex

const admin = require('../../init-db').firebase_admin;
const geo = require('geofirex').init(admin);
const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const Status =require('../../../status/status');
const { get } = require('geofirex');
const {Obeservable, BehaviourSubject} =require('rxjs')

const FieldString=require('../FieldStrings')

// API for fetching driver
// THIS API is not fucntional. Need to make it work
module.exports.GetClosestDrivers = function () {
    var driversCol = db.collection(Constants.DRIVER)//.where('status', '==', 'transit');
    const center = geo.point(40.1, -119.1);
    const radius = 100000000;
    const field = 'point';

     
    //const geoRef = geo.query(driversCol).within(center, radius, field)
    const query = geo.query(driversCol).within(center, radius, field,{ log: true }).toPromise()
    query.then(( res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err)
    })
}
module.exports.getIdleDrivers = function () {
    var query = db.collection(Constants.DRIVER).where(Constants.STATUS, '==', Status.IDLE);
    return query.limit(1).get();
}
/*
This api gets the potential driver who can pick up the rider
*/
module.exports.getPotentialDriver = function () {
    var query = db.collection(Constants.DRIVER).where(FieldString.CAPACITY_AVAILABILE,'>', Constants.VEHICLE_MIN_CAPACITY)
    return query.limit(1).get();
    
}





