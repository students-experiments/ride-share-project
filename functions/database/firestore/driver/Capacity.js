const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const FieldStrings= require('../FieldStrings');
const admin=require('../../init-db').firebase_admin

// usage or merge  and doc.set - update: 
// https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
module.exports.addCapacity = function addCapacity(uid, capacity) {
    var doc = db.collection(Constants.DRIVER).doc(uid);
    var cap
    if(!capacity){
        cap=Constants.VEHICLE_DEFAULT_CAPACITY
    }else{
        cap=capacity
    }
    return doc.set({
      [FieldStrings.CAPACITY_AVAILABILE]: cap
    }, { merge: true });
  }
  module.exports.decrementCapacity = function decrementCapacity(driverUID, capacity) {
    var doc = db.collection(Constants.DRIVER).doc(driverUID);
    var cap
    if(!capacity){
        cap=-1
    }else{
        cap=capacity
    }
    return doc.update({
      [FieldStrings.CAPACITY_AVAILABILE]: admin.firestore.FieldValue.increment(cap)
    }, { merge: true });
  }
