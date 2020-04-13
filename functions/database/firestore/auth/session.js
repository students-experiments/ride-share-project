const firebase_admin = require("../../init-db").firebase_admin;
const utils = require("../util.js");

var db = firebase_admin.firestore();

function deleteLoggedInSession(session) {
  return new Promise((resolve, reject) => {
    // [START delete_document]
    db.collection("sessions")
      .doc(session)
      .delete()
      .then(res => {
        console.log("Deleted session", session);
        resolve(res);
        return res;
      })
      .catch(error => {
        utils.handleError(error);
        reject(new Error("Unable to delete Session. " + error.message));
        return;
      });
  });
}
// given the session it gets the role.
function getSessionRole(session) {
  return new Promise((resolve, reject) => {
    var sessionRef = db.collection("sessions").doc(session);
    sessionRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          reject(new Error("Session Invalid"));
        }
        resolve(doc.data().role);
        return doc.data().role;
      })
      .catch(error => {
        reject(new Error("Session Document unable to fetch" + error.message));
      });
  });
}
// given the stores the role for the given
function storeSessionData(session, user) {
  return new Promise((resolve, reject) => {
    var sessionRef = db.collection("sessions").doc(session);
    // Atomically add a new region to the "regions" array field.
    sessionRef
      .set({
        role: user.role,
        uid: user.uid
      })
      .then(res => {
        resolve({ sessionCookie: session });
        console.log("session cookie saved in DB", res);
        return res;
      })
      .catch(error => {
        utils.handleError(error);
        reject(new Error("Unable to store Session. " + error.message));
        return;
      });
  });
}

module.exports.storeSessionData = storeSessionData;
module.exports.getSessionRole = getSessionRole;
module.exports.deleteLoggedInSession = deleteLoggedInSession;
