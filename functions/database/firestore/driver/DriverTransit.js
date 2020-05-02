const db = require("../../init-db").firestore;
const Constants = require("../../ConstantsUtil");
const admin = require("../../init-db").firebase_admin;
const FieldStrings = require("../FieldStrings");
const Status = require("../../../status/status");

// usage or merge  and doc.set - update:
/*

Creates a new Collection if it doesnt exit in driver-uid named: transit_riders
this collections contains documents with each rider, whose ride has been accepted by the driver.

*/
module.exports.addRiderToTransit = function addRiderToTransit(driverUID, riderUID, driverName, riderName) {

    return db
    .collection(Constants.DRIVER)
    .doc(driverUID)
    .update({
      [FieldStrings.DRIVER_ACCEPTED_RIDERS]: admin.firestore.FieldValue.arrayUnion(riderUID),
      [FieldStrings.DRIVER_ACCEPTED_RIDER_NAMES]: admin.firestore.FieldValue.arrayUnion(riderName),
      [FieldStrings.CAPACITY_AVAILABILE]: admin.firestore.FieldValue.increment(-1)
    })
  
};

/*
db.collection("cities").doc("DC").delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
*/


module.exports.removeRiderFromTransit = function removeRiderFromTransit(driverUID,riderUID, riderName) {

  return db.collection(Constants.DRIVER).doc(driverUID)
  .update({
    [FieldStrings.DRIVER_ACCEPTED_RIDERS]: admin.firestore.FieldValue.arrayRemove(riderUID),
      [FieldStrings.DRIVER_ACCEPTED_RIDER_NAMES]: admin.firestore.FieldValue.arrayRemove(riderName),
    [FieldStrings.CAPACITY_AVAILABILE]: admin.firestore.FieldValue.increment(1)
  })
};
/*

The delete collection documentation is provide in this link:
https://firebase.google.com/docs/firestore/manage-data/delete-data

Gist:
We cannot delete the collection directly, we need to delete the documents inside of each 
and then delete the collections

*/
module.exports.endTransit = function endTransit(driverUID) {
  return db.collection(Constants.DRIVER).doc(driverUID)
  .update({
    [FieldStrings.DRIVER_ACCEPTED_RIDERS]: admin.firestore.FieldValue.delete(),
    [FieldStrings.DRIVER_FOUND_MATCHES]: admin.firestore.FieldValue.delete(),
    [FieldStrings.STATUS]: Status.IDLE,
    [FieldStrings.CAPACITY_AVAILABILE]: Constants.VEHICLE_DEFAULT_CAPACITY
  })
};

function deleteCollection(db, collectionRef, batchSize) {
  let query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve, reject);
  });
}

function deleteQueryBatch(db, query, resolve, reject) {
  query
    .get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0;
      }

      // Delete documents in a batch
      let batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then((numDeleted) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, resolve, reject);
      });
    })
    .catch(reject);
}
