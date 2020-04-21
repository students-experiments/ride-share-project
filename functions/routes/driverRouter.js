const express = require("express");
const DriverRouter = express.Router();
const AddDriverLocation_FireStore= require('../database/firestore/driver/DriverLocation')
const ClosestDriver= require('../database/firestore/driver/RetriveDrivers');
const RetriveDrivers = require( '../database/firestore/driver/RetriveDrivers');
const Utils = require('./utils');
const DriverTransit = require('../database/firestore/driver/DriverTransit');
const DriverMatch = require('../database/firestore/driver/Match')
const RiderTransit =require('../database/firestore/rider/RiderTransit')
const DriverPickUp = require('../database/firestore/driver/DriverPickUp')
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
   console.log(req.body.data)
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
  DriverPickUp.updateDriverToPick(user.uid,capacity)
  .then(()=>{
    console.log('Driver Availble to Pick Up Rider')
    res.status(200).json({user: user,status: 'success'})
  })
  .catch((err)=>{
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
function moverRiderFromMatchedToTransit(driverUID,riderUID){
  return new Promise((resolve,reject)=>{
    var data
    DriverMatch.getRiderDocFromMatchesList(driverUID,riderUID)
    .then((doc)=>{
      if(! doc.exists){
        throw new Error('Rider doesnt exist in Matched List');
      }
      data=doc.data();
      console.log('moving rider to transit')
      return DriverTransit.addRiderToTransit(driverUID,riderUID,data)
    })
    .then(()=>{
      console.log('removing rider from matched list')
      return DriverMatch.removeRiderFromMatchesList(driverUID,riderUID)
    })
    .then(()=>{
      resolve(riderUID)

    })
    .catch((err)=>{
      console.log('unable to move rider to transit')
      reject(err)
    })
  })
 
}

DriverRouter.post('/AcceptRider',Utils.requireDriverAuth,(req,res)=>{
  const {user,rider} = req.body.data;
  var riderUID=rider.uid
  var driverUID=user.uid

  moverRiderFromMatchedToTransit(driverUID,riderUID)
  .then(()=>{
    return RiderTransit.addDriverTransit(riderUID,driverUID)
  })
  .then(()=>{
    console.log('Driver Ride accept success')
    res.status(200).json({riderUID:riderUID})

  }).catch((err)=>{
    res.send(404).send(err)
  })
  

  // DriverTransit.addRiderToTransit(user.uid,rider)
  // .then(()=>{
  //     res.sendStatus(200);
  //   }).catch((err)=>{
  //     console.log(err);
  //     res.status(404).send(err)
  //   })
})

DriverRouter.post('/EndRide',Utils.requireDriverAuth,(req,res)=>{
  const {user,rider} = req.body.data;
  DriverTransit.removeRiderFromTransit(user.uid,rider.uid)
  .then(()=>{
    console.log('removed Rider from Driver')
      res.sendStatus(200);
    }).catch((err)=>{
      console.log(err);
      res.status(404).send(err)
    })
})


DriverRouter.post('/EndTransit',Utils.requireDriverAuth,(req,res)=>{
  const {user} = req.body.data;
  DriverTransit.endTransit(user.uid)
  .then(()=>{
    console.log('Ended Transit for Driver')
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