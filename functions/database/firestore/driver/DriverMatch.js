const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const admin = require('../../init-db').firebase_admin;
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
      [FieldStrings.DRIVER_FOUND_MATCHES]: admin.firestore.FieldValue.arrayRemove(riderUID)
    })
  }

  module.exports.verifyRiderInMatchesList = function verifyRiderInMatchesList(driverUID,riderUID) {

    return new Promise((resolve,reject)=>{
      db.collection(Constants.DRIVER).
      where('matched_riders','array-contains',riderUID.toString()).get()
      .then((snapshot)=>{
        console.log("Matched rider uid: ");
        console.log(snapshot)
        if (snapshot.empty ) {
          reject (new Error('Rider doesnt exist in Matched List'))
        }  
        if(snapshot.size > 1  ){
          reject (new Error('Too Many Drivers have the same Rider UID'));
        }
        if(snapshot.docs[0].id !== driverUID){
          reject ( new Error('Rider doesnt exist in Driver\'s Matched List'));
        }
        resolve(riderUID);

      }).catch((err)=>{
        reject(err)
      })
    })
      
  }
  

