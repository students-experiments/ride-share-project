const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const admin = require('../../init-db').firebase_admin;
const geo = require('geofirex').init(admin);
const RiderChangeStatus = require('../rider/ChangeStatus')
const Status =require('../../../status/status')
// usage or merge  and doc.set - update: 
/*

Creates a new Collection if it doesnt exit in driver-uid named: transit_riders
this collections contains documents with each rider, whose ride has been accepted by the driver.

*/
module.exports.addRiderToTransit = function addRiderToTransit(uid, rider,transitData) {
    var docRef = db.collection(Constants.DRIVER).doc(uid)
    .collection(Constants.DRIVER_ACCEPTED_RIDERS).doc(rider.uid)
    return  docRef.set(transitData);

}

/*
db.collection("cities").doc("DC").delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
*/

  module.exports.removeRiderFromTransit = function removeRiderFromTransit(uid, rider) {
    var docRef = db.collection(Constants.DRIVER).doc(uid)
    .collection(Constants.DRIVER_ACCEPTED_RIDERS).doc(rider.uid)
    return docRef.delete();
  }

