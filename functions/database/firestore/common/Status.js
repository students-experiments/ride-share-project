const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');

module.exports.changeStatus = function (role, status, uid) {
    var doc = db.collection(role).doc(uid);
    return doc.update({
        status: status
    });
  }
module.exports.getUserStatus=function (uid){
    var path=Constants.referenceJoiner(' ',role,Constants.STATUS,uid)
}

module.exports.writeStatus = function (role, status, uid) {
    var doc = db.collection(role).doc(uid);
    //console.log('')
    return doc.set({
        status: status
    }, {merge:true} );
  }
