const db = require("../../init-db").firestore;
const Constants = require("../../ConstantsUtil");
const FieldStrings = require("../FieldStrings");
const admin = require('../../init-db').firebase_admin;
// usage or merge  and doc.set - update:
/*

Adds a new fiel
*/
module.exports.addDriverMatched = function addDriverMatched(riderUID,driverUID) {
  var docRef = db.collection(Constants.RIDER).doc(riderUID);
  return docRef.set(
    {
      [FieldStrings.MATCHED_DRIVER]: driverUID,
    },
    { merge: true }
  );
};


module.exports.removeDriverMatched = function removeDriverMatched(riderUID) {
  
  var docRef = db.collection(Constants.RIDER).doc(riderUID)
  return docRef.update(
    {
      [FieldStrings.MATCHED_DRIVER]: admin.firestore.FieldValue.delete(),
    },
    { merge: true }
  );
};