const db = require("../../init-db").firestore;
const Constants = require("../../ConstantsUtil");
const FieldStrings = require("../FieldStrings");
const Status=require('../../../status/status')
const admin=require('../../init-db').firebase_admin
// usage or merge  and doc.set - update:

/*

Adds a new fiel
*/
module.exports.addDriverTransit = function addDriverTransit(riderUID,driverUID) {
  var docRef = db.collection(Constants.RIDER).doc(riderUID);
  return docRef.set(
    {
      [FieldStrings.TRANSIT_DRIVER]: driverUID,
      [FieldStrings.STATUS]: Status.TRANSIT,
      [FieldStrings.MATCHED_DRIVER]: admin.firestore.FieldValue.delete(),
    },
    { merge: true }
  );
};


module.exports.endRide = function endRide(riderUID,driverUID) {
    var docRef = db.collection(Constants.RIDER).doc(riderUID);
    return docRef.set(
      {
        [FieldStrings.TRANSIT_DRIVER]: admin.firestore.FieldValue.delete(),
        [FieldStrings.STATUS]: Status.IDLE
      },
      { merge: true }
    );
  };
