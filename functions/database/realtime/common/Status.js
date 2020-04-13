const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');

module.exports.changeStatus = function (role, status, uid) {
    var path=Constants.referenceJoiner(' ',role,uid)
    var ref = db.ref(path)
    return ref.update({
        status: status
    });
  }
module.exports.getUserStatus=function (uid){
    var path=Constants.referenceJoiner(' ',role,Constants.STATUS,uid)
}

module.exports.writeStatus = function (role, status, uid) {
    var path=Constants.referenceJoiner(' ',role,uid)
    var ref = db.ref(path)
    return ref.set({
        status: status
    });
  }
