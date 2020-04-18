const db = require('../../init-db').firestore
const Constants = require('../../ConstantsUtil');
const FieldString =require('../FieldStrings')
/*
 Gets Rider Document
 */
  module.exports.getRiderRequest = function (uid) {
    var doc = db.collection(Constants.RIDER).doc(uid);
    return new Promise((resolve,reject)=>{
      doc.get([FieldString.RIDE_REQUEST])
      .then((doc)=>{
        if (doc.exists) {
          console.log("Document data:", doc.data());
          return resolve(doc.data()[FieldString.RIDE_REQUEST]);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          return 'no Such Doc'
      }
      }).catch((err)=>{
          return reject(err)
      })
    })
    
  }