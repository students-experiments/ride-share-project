const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const Status= require('../../../status/status');
const admin=require('../../init-db').firebase_admin

// MAJOR TODO: Remove Capcity Object from Status and make a new function
// Added now for fucntional working.
module.exports.changeStatus = function (role, status, uid) {
    var doc = db.collection(role).doc(uid);
    switch (role){
        case Constants.DRIVER: 
            return changeDriverStatus(doc,status);
        case Constants.RIDER: 
            return changeRiderStatus(doc,status);
    }
    throw new Error('unable to Change starus of gievn Role',role)
  }
module.exports.getUserStatus=function (uid){
    var path=Constants.referenceJoiner(' ',role,Constants.STATUS,uid)
}

module.exports.writeStatus = function (role, status, uid) {
    var doc = db.collection(role).doc(uid);
    //console.log('')
    return doc.set({
        status: status,
        cap: Constants.DRIVER_DEFAULT_CAPACITY
    }, {merge:true} );
  }
function changeRiderStatus(doc,status){
    return doc.update({
        status: status
    });
}
function changeDriverStatus( doc,status){
    switch(status){
        case  Status.IDLE:
        {
            return doc.update({
                status: status,
                cap: Constants.DRIVER_DEFAULT_CAPACITY
            });
        }
        case Status.TRANSIT:
        {
            return doc.update({
                status: status,
                cap: admin.firestore.FieldValue.increment(-1)
            });
        }
    }
    
}
