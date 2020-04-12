const db =require('../../init-db').realtimedb
const Constants =require('../../ConstantsUtil');


module.exports.writeDriverLocation = function writeDriverLocation(userId, data) {
    var path=Constants.referenceJoiner(Constants.DRIVER_LOCATION_REF,userId);
    var ref = db.ref(path);
    return ref.set({
      location: data
    });
  }
