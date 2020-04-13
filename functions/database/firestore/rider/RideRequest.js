const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const admin=require('../../init-db').firebase_admin

// usage or merge  and doc.set - update: 
// https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
module.exports.deleteRideRequest = function (uid) {
    var doc = db.collection(Constants.RIDER).doc(uid);
    return doc.update ({
      request : admin.firestore.FieldValue.delete()
    }, { merge: true });
  }
  module.exports.addRideRequest = function (uid, data) {
    var doc = db.collection(Constants.RIDER).doc(uid);
    var start =new admin.firestore.GeoPoint(data.start.latitude, data.start.longitude);
    var end = new admin.firestore.GeoPoint(data.start.latitude, data.start.longitude);
    return doc.set({
      request : {
        start : start,
        end : end
      }
    }, { merge: true });
  }