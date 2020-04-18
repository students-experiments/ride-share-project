


module.exports.getTransitData =function (riderUID){
  return new Promise((resolve,reject)=>{
      FindDriver.getDriverMatch(riderUID)
      .then((driverUID)=>{
          var riderStatusChanged=ChangeRiderStatus.changeRiderStatus(riderUID,Status.TRANSIT);
          var driverStatusChanged=ChangeDriverStatus.changeDriverStatus(driverUID,Status.TRANSIT);
          return new Promise.all([riderStatusChanged,driverStatusChanged])
      })
      .then((res)=>{
          console.log("Rider and Driver Status changed",res);
          var transitData={
              transitID: generateUniqueId(riderUID,driverUID),
              riderUID: riderUID,
              driverUID: driverUID
          }
          console.log('transit data',transitData);
          return resolve(transitData);
      })
      .catch((err) =>{
          console.log(err);
          // TODO: write logic when one of the promises fails.
          reject(err);
      })

  })
}
// fucntion to get Unique Id
// TODO change this later
// right now use rider-id and driver-id
function generateUniqueId(...args){
  return args.join('_');
}