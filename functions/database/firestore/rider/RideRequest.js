const db = require('../../init-db').firestore
const Constants = require('../../ConstantsUtil');
const admin=require('../../init-db').firebase_admin
const GeoPoint=require('../common/GeoPoint')
const FieldStrings =require('../FieldStrings');
const Status =require('../../../status/status')

// usage or merge  and doc.set - update: 
// https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
module.exports.deleteRideRequest = function (uid) {
    var doc = db.collection(Constants.RIDER).doc(uid);
    // This should delete request object as well as change rider status to idle and remove the matched driver field
    return doc.update ({
      request : admin.firestore.FieldValue.delete()
    }, { merge: true });
  }

/*
  Adds Ride Request field in rider document

*/
  module.exports.addRideRequest = function (uid, data) {
    var doc = db.collection(Constants.RIDER).doc(uid);
    return doc.set({
      [FieldStrings.RIDE_REQUEST] : {
        [FieldStrings.START_LOCATION] : GeoPoint.getGeoPoint(data.start.latitude, data.start.longitude),
        [FieldStrings.END_LOCATION]  : GeoPoint.getGeoPoint(data.end.latitude, data.end.longitude),
      },[FieldStrings.STATUS]: Status.AVAILABLE
    }, { merge: true });
  }
