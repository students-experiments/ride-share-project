const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const admin = require('../../init-db').firebase_admin;
const geo = require('geofirex').init(admin);

// usage or merge  and doc.set - update: 
// https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
module.exports.writeDriverLocation = function writeDriverLocation(uid, data) {
    var doc = db.collection(Constants.DRIVER).doc(uid);
    var point = geo.point(data.latitude, data.longitude);
    return doc.set({
      "point": point.geopoint,
      "geohash": point.geohash
    }, { merge: true });
  }
