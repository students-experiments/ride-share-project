const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const FieldStrings= require('../FieldStrings');
const admin=require('../../init-db').firebase_admin
const Status =require('../../../status/status')

// usage or merge  and doc.set - update: 
// https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
module.exports.updateDriverToPick = function addCapacity(uid, capacity) {
    var doc = db.collection(Constants.DRIVER).doc(uid);
    var vehicleCap=Constants.VEHICLE_DEFAULT_CAPACITY
    if(capacity){
        vehicleCap = capacity
    }
    return doc.set({
      [FieldStrings.CAPACITY_AVAILABILE]: vehicleCap,
      [FieldStrings.STATUS]: Status.AVAILABLE
    }, { merge: true });
  }