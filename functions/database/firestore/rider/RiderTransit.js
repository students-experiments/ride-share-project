const db = require("../../init-db").firestore;
const Constants = require("../../ConstantsUtil");
const FieldStrings = require("../FieldStrings");
const Status=require('../../../status/status')
// usage or merge  and doc.set - update:

/*

Adds a new fiel
*/
module.exports.updateTransit = function updateTransit(riderUID,driverUID) {
  var docRef = db.collection(Constants.RIDER).doc(riderUID);
  return docRef.set(
    {
      [FieldStrings.TRANSIT_DRIVER]: driverUID,
      [FieldStrings.STATUS]: Status.TRANSIT
    },
    { merge: true }
  );
};
