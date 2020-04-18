const db = require("../../init-db").firestore;
const Constants = require("../../ConstantsUtil");

const RetriveDrivers = require("../driver/RetriveDrivers");

/*
This function does following things:

1. retrives idle Drivers nd get the top most
2. makes an object which could be used for transit

*/
module.exports.getDriverMatch = function (riderUID) {
  return new Promise((resolve, reject) => {
    RetriveDrivers.getIdleDrivers()
      .then((driver) => {
        // only if the driver exists:
        if (driver.docs.length === 0) {
          return reject(new Error("No Idle Drivers"));
        } else {
          console.log(" top most :", driver.docs[0].id);
          return resolve(driver.docs[0].id);
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// JUST gets the first driver from idle Drivers list
// TODO: Helper function to be removed later
function getFirstIdleDriver(idleDrivers) {
  return new Promise((resolve, reject) => {
    idleDrivers
      .then((drivers) => {
        list = [];
        drivers.array.forEach((element) => {});
        console.log(" list of drivers idle:", drivers);
        return resolve(drivers[0]);
      })
      .catch(() => {
        return reject(new Error("No Idle Drivers"));
      });
  });
}
