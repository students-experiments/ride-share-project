const express = require("express");
const DriverRouter = express.Router();
const DriverStatus = require ('../database/firestore/driver/ChangeStatus');
const Status =require('../status/status');
const AddDriverLocation_FireStore= require('../database/firestore/driver/AddDriverLocation')
const ClosestDriver= require('../database/firestore/driver/RetriveDrivers');
const RetriveDrivers = require( '../database/firestore/driver/RetriveDrivers');
const Utils =require('./utils');

 /*
  Sample Data for this API:
  {
      "data": {
          "location": {
              "lat": "1234567",
              "long": "123456789"
          },
          "user" :{
              "uid": "UJSLK06TrXZuB5SKGaQ86H1J8Ut2",
              "role": "driver"
          }
          
      }
  }
  */
 DriverRouter.post('/AddLocation',Utils.requireDriverAuth,(req,res)=>{
  const {user, location} = req.body.data;
  AddDriverLocation_FireStore.writeDriverLocation(user.uid,location)
  .then(()=>{
    console.log("Added Driver Location");
    res.sendStatus(200);
  }).catch((err)=>{
    console.log(err);
    res.status(404).send(err)
  })
})



  /*
  Following is how to use change status api
  ChangeRiderStatus.changeRiderStatus(user.uid,Status.IDLE)
  .then(()=>{
      //console.log("Added Driver Location");
      res.sendStatus(200);
    }).catch((err)=>{
      console.log(err);
      res.status(404).send(err)
    })
    */

/* Request JSON:
{
    "data": {
        "user" :{
            "uid": "UJSLK06TrXZuB5SKGaQ86H1J8Ut2",
            "role": "driver"
        }
    }
}
*/
DriverRouter.post('/ReadyToPick',Utils.requireDriverAuth,(req,res)=>{
  const {user} = req.body.data;
  DriverStatus.changeDriverStatus(user.uid,Status.IDLE)
  .then(()=>{
      res.sendStatus(200);
    }).catch((err)=>{
      console.log(err);
      res.status(404).send(err)
    })
})
// This query is work in progress . yet to be completed.
DriverRouter.get('/GetClosestDrivers',Utils.requireDriverAuth,(req,res)=>{
  const {user} = req.body.data;
  ClosestDriver.GetClosestDrivers();
  res.status(200)
  
})

DriverRouter.get('/GetIdleDrivers',(req,res)=>{
  RetriveDrivers.getIdleDrivers();
  res.sendStatus(200);
})

module.exports = DriverRouter;