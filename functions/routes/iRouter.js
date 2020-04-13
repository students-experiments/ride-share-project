const express = require("express");
const router = express.Router();
const Claims =require('../database/firestore/user/Claims');
const CommonStatus = require ('../database/firestore/common/Status');
const Status = require('../status/status');

function isRequestUidValid(req) {
  if (!req.body.data.user.uid) {
    return false;
  }
  return true;
}

function requireUser(req,res,next){
  data=req.body.data;
  if(isRequestUidValid(req))
  {
    res.send(400);
  }
  else{
    console.log("authorised user :",data.uid)
    // eslint-disable-next-line callback-return
    next();
  }

}
  router.post("/addUserClaims", (req,res)=>{
    console.log('req recieved:', req.body.data);
    const {uid, claims}= req.body.data;
    Claims.setCustomUserClaims(uid,claims)
    .then(()=>{
      return CommonStatus.writeStatus(claims.role,Status.IDLE,uid);
    })
    .then(()=>{
      res.sendStatus(200)
    })
    .catch((err)=>{ 
      console.log(err);
      res.status(404).send(err)
    })
   
  });
//   /*
//   Sample Data for this API:
//   {
//       "data": {
//           "location": {
//               "lat": "1234567",
//               "long": "123456789"
//           },
//           "user" :{
//               "uid": "UJSLK06TrXZuB5SKGaQ86H1J8Ut2",
//               "role": "driver"
//           }
          
//       }
//   }
//   */
//   router.post('/driver/AddLocation',requireDriverAuth,(req,res)=>{
//     const {user, location} = req.body.data;
//     AddDriverLocation_FireStore.writeDriverLocation(user.uid,location)
//     .then(()=>{
//       console.log("Added Driver Location");
//       res.sendStatus(200);
//     }).catch((err)=>{
//       console.log(err);
//       res.status(404).send(err)
//     })
// })

  
  
//     /*
//     Following is how to use change status api
//     ChangeRiderStatus.changeRiderStatus(user.uid,Status.IDLE)
//     .then(()=>{
//         //console.log("Added Driver Location");
//         res.sendStatus(200);
//       }).catch((err)=>{
//         console.log(err);
//         res.status(404).send(err)
//       })
//       */

//   /* Request JSON:
//   {
//       "data": {
//           "user" :{
//               "uid": "UJSLK06TrXZuB5SKGaQ86H1J8Ut2",
//               "role": "driver"
//           }
//       }
//   }
//   */
//   router.post('/driver/ReadyToPick',requireDriverAuth,(req,res)=>{
//     const {user} = req.body.data;
//     DriverStatus.changeDriverStatus(user.uid,Status.IDLE)
//     .then(()=>{
//         res.sendStatus(200);
//       }).catch((err)=>{
//         console.log(err);
//         res.status(404).send(err)
//       })
//   })
//   // This query is work in progress . yet to be completed.
//   router.get('/driver/GetClosestDrivers',requireDriverAuth,(req,res)=>{
//     const {user} = req.body.data;
//     ClosestDriver.GetClosestDrivers();
//     res.status(200)
    
//   })
  
//   router.get('/driver/GetIdleDrivers',(req,res)=>{
//     RetriveDrivers.getIdleDrivers();
//     res.sendStatus(200);
//   })

  module.exports = router;
