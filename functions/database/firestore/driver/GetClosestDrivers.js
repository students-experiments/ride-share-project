// In this we will make use of the GEO fireX for getting the drivers within some radious

// https://github.com/codediodeio/geofirex

const admin = require('../../init-db').firebase_admin;
const geo = require('geofirex').init(admin);
const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const { get } = require('geofirex');
const {Obeservable, BehaviourSubject} =require('rxjs')

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