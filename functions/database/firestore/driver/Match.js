const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const admin = require('../../init-db').firebase_admin;
const Status =require('../../../status/status')
const FieldStrings = require("../FieldStrings");
// usage or merge  and doc.set - update: 
/*

Creates a new Collection if it doesnt exit in driver-uid named: transit_riders
this collections contains documents with each rider, whose ride has been accepted by the driver.

*/
module.exports.addRiderToMatchesList = function addRiderToMatchesList(driverUID, riderUID,data) {
    return db.collection(Constants.DRIVER).doc(driverUID)
    .update({
      [FieldStrings.DRIVER_FOUND_MATCHES]: admin.firestore.FieldValue.arrayUnion(riderUID)
    })
    

}

/*
db.collection("cities").doc("DC").delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
*/

  module.exports.removeRiderFromMatchesList = function removeRiderFromMatchesList(driverUID, riderUID) {
    return db.collection(Constants.DRIVER).doc(driverUID)
    .update({
      found_matches: admin.firestore.FieldValue.arrayRemove(riderUID)
    })
  }

  module.exports.getRiderDocFromMatchesList = function getRiderDocFromMatchesList(driverUID, riderUID) {
    var docRef = db.collection(Constants.DRIVER).doc(driverUID)
    .collection(Constants.DRIVER_FOUND_MATCHES).doc(riderUID)
    return docRef.get();
  }
  

