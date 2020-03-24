var db = require("../init-db").firestore;

function validateUser(user) {
  return new Promise((resolve, reject) => {
    if (user.email && user.pass && user.username) resolve("valid user");
    else {
      reject(new Error("invalid email or password"));
    }
  });
}

function validateUserRole(uid, role) {
  return new Promise((resolve, reject) => {
    console.log("invalidation", uid);
    var userRef = db.collection("users").doc(uid);
    userRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          reject(new Error("invalid uid"));
        }
        if (doc.data().role === role) {
          console.log("valided user role");
          resolve(role);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(new Error("Not right role"));
        }
        return;
      })
      .catch(error => {
        console.log("User role validation Failed");
        reject(new Error("User role validation Failed" + error.message));
      });
  });
}
module.exports = {
  validateUser: validateUser,
  validateUserRole: validateUserRole
};
