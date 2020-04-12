const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const admin=require('../../init-db').firebase_admin
const RetriveDrivers= require('../driver/RetriveDrivers');
const ChangeDriverStatus =require('../driver/ChangeStatus');
const Status =require('../../../status/status');
const ChangeRiderStatus =require ('../rider/ChangeStatus');

const FindDriver =require('./FindDriver')
/*
This function does following things:
1. retrives idle Drivers nd get the top most
2. changes status of Driver
3. generates Transit Id
*/
module.exports.getTransitData =function (riderUID){
    return new Promise((resolve,reject)=>{
        FindDriver.getDriverMatch(riderUID)
        .then((driverUID)=>{
            return ChangeDriverStatus.changeDriverStatus(driverUID,Status.TRANSIT)
        })
        .then((driverUID)=>{
            // eslint-disable-next-line promise/no-nesting
            ChangeRiderStatus.changeRiderStatus(riderUID,Status.TRANSIT)
            .then(()=>{
                var transitId= generateUniqueId(riderUID,driverUID)
                var transitData={
                    transitID: transitId,
                    riderUID: riderUID,
                    driverUID: driverUID
                }
                console.log('transit data',transitData);
                return resolve(transitData);
            })
            .catch((err)=>{
                ChangeDriverStatus.changeDriverStatus(driverUID,Status.IDLE)
                console.log('rider status not able to change. Aborting ride match')
                reject(err)
            })  
        })
        .catch((err)=>{
            ChangeDriverStatus.changeDriverStatus(driverUID,Status.IDLE)
            reject(err);
        })

    })
}
// fucntion to get Unique Id
// TODO change this later
// right now use rider-id and driver-id
function generateUniqueId(...args){
    return args.join('_');
}

module.exports.writeTransitData = function (transitObj) {
    return new Promise((resolve,reject)=>{
        var doc = db.collection(Constants.TRANSIT).doc(transitObj.transitID);
        doc.set({
        "riderUID": transitObj.riderUID,
        "driverUID": transitObj.driverUID
        })
        .then(()=>{
            console.log('Wrting transit data successful')
            return resolve(transitObj.transitID);
        })
        .catch((err)=>{
            return reject(err)
        })
    })
  }
