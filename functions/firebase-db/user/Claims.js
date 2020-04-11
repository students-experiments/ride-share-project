const firebase_admin = require("../init-db").firebase_admin;

function setUserClaims(user, claims){
    return firebase_admin.auth().setCustomUserClaims(user.uid, claims);
}

module.exports.setCustomUserClaims=setUserClaims;