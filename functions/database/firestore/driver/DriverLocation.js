const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const FieldStrings=require('../FieldStrings');
const GeoPoint = require('../common/GeoPoint')


// usage or merge  and doc.set - update: 
// https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
module.exports.writeDriverLocation = function writeDriverLocation(uid, data, driverName) {
    var doc = db.collection(Constants.DRIVER).doc(uid);
    const GeoPoint =require('../common/GeoPoint')
    return doc.set({
        [FieldStrings.NAME]: driverName,
        [FieldStrings.LOCATION]: GeoPoint.getGeoPoint(Number.parseFloat(data.latitude), Number.parseFloat(data.longitude))
    }, { merge: true });
  }
