const db =require('../../init-db').firestore
const Constants =require('../../ConstantsUtil');
const Status= require('../../../status/status');

const FieldStrings=require('../FieldStrings')

// MAJOR TODO: Remove Capcity Object from Status and make a new function
// Added now for fucntional working.
module.exports.changeStatus = function (role, status, uid) {
    var doc = db.collection(role).doc(uid);
    return doc.update({
        [FieldStrings.STATUS]: status
    });
}
module.exports.getUserStatus=function (uid){
    var path=Constants.referenceJoiner(' ',role,Constants.STATUS,uid)
}

module.exports.writeStatus = function (role, status, uid) {
    var doc = db.collection(role).doc(uid);
    //console.log('')
    return doc.set({
        status: status,
    }, {merge:true} );
  }
// function changeRiderStatus(doc,status){
//     return doc.update({
//         status: status
//     });
// }
// function changeDriverStatus( doc,status){
//     switch(status){
//         case  Status.IDLE:
//         {
//             return doc.update({
//                 status: status
//             });
//         }
//         case Status.TRANSIT:
//         {
//             return doc.update({
//                 status: status
//             });
//         }
//     }
    
// }
