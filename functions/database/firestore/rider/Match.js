const db = require("../../init-db").firestore;
const Constants = require("../../ConstantsUtil");
const FieldStrings = require("../FieldStrings");
// usage or merge  and doc.set - update:
/*

Adds a new fiel
*/
module.exports.addDriverMatched = function addDriverMatched(riderUID,driverUID, matchedDriverName) {
    console.log(matchedDriverName);
  var docRef = db.collection(Constants.RIDER).doc(riderUID);
  return docRef.set(
    {
      [FieldStrings.MATCHED_DRIVER]: driverUID,
      [FieldStrings.MATCHED_DRIVER_NAME]: matchedDriverName
    },
    { merge: true }
  );
};
