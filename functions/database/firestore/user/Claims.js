const firebase_admin = require("../../init-db").firebase_admin;

function setUserClaims(uid, claims){
    return firebase_admin.auth().setCustomUserClaims(uid, claims);
}

module.exports.setCustomUserClaims=setUserClaims;