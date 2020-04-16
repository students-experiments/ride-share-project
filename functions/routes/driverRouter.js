const express = require("express");
const DriverRouter = express.Router();
const DriverStatus = require ('../database/firestore/driver/ChangeStatus');
const Status =require('../status/status');
const AddDriverLocation_FireStore= require('../database/firestore/driver/DriverLocation')
const ClosestDriver= require('../database/firestore/driver/RetriveDrivers');
const RetriveDrivers = require( '../database/firestore/driver/RetriveDrivers');
const Utils = require('./utils');
const DriverTransit = require('../database/firestore/driver/Transit');
const Capacity= require('../database/firestore/driver/Capacity');
 /*
  Sample Data for this API:
 {
	  "data": {
	      "location": {
	          "latitude": 80,
	          "longitude": 119
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
  const {user , capacity} = req.body.data;
  DriverStatus.changeDriverStatus(user.uid,Status.IDLE)
  .then(()=>{
    console.log('Driver Status changed')
    return Capacity.addCapacity(user.uid,capacity)
    }).then(()=>{
      console.log('Driver Vehicle capacity updated')
      res.json({status: 200, message: "driver Ready to pick up"});
    }).catch((err)=>{
      console.log(err);
      res.status(404).send(err)
    })
})
/*
JSON Request:
{
      "data": {
  
          "user" :{
              "uid": "UJSLK06TrXZuB5SKGaQ86H1J8Ut2",
              "role": "driver"
          },
          "rider":{
          	"uid":"Ad1I5WhVY1dfGUiPvRuJ3wLils12",
              "start":{
                  "latitude": 20.0,
                  "longitude": 90.0
              },
              "end":{
                  "latitude": 20.0,
                  "longitude": 90.0
              }
          }
          
      }
 }

*/

DriverRouter.post('/AcceptRider',Utils.requireDriverAuth,(req,res)=>{
  const {user,rider} = req.body.data;
  DriverTransit.addRiderToTransit(user.uid,rider)
  .then(()=>{
      res.sendStatus(200);
    }).catch((err)=>{
      console.log(err);
      res.status(404).send(err)
    })
})

DriverRouter.post('/EndRide',Utils.requireDriverAuth,(req,res)=>{
  const {user,rider} = req.body.data;
  DriverTransit.removeRiderFromTransit(user.uid,rider)
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