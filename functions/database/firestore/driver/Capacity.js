const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const FieldStrings= require('../FieldStrings');


// usage or merge  and doc.set - update: 
// https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
module.exports.addCapacity = function writeDriverLocation(uid, capacity) {
    var doc = db.collection(Constants.DRIVER).doc(uid);
    var cap
    if(!capacity){
        cap=Constants.DRIVER_DEFAULT_CAPACITY
    }else{
        cap=capacity
    }
    return doc.set({
      [FieldStrings.VEHICLE_CAPACITY]: cap
    }, { merge: true });
  }
