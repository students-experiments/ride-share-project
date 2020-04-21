const express = require("express");
const RiderRouter = express.Router();
const RideRequest = require("../database/firestore/rider/RideRequest");
const Transit = require("../database/firestore/common/Transit");
const RouterUtils = require("./utils");
const RetriveDrivers = require("../database/firestore/driver/RetriveDrivers");
const RetriveRiders = require("../database/firestore/rider/RetriveRider");
const DriverMatch = require("../database/firestore/driver/Match");
const RiderStatus = require("../database/firestore/rider/RiderStatus");
const Status = require("../status/status");
const RiderMatch = require('../database/firestore/rider/Match');
/*
  Request JSON:
  {
      "data": {
  
          "user" :{
              "uid": "1tQD4hCqipXcRPCYGLufuhFijam2",
              "role": "rider"
          },
          "request":{
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
RiderRouter.post("/AddRide", RouterUtils.requireRiderAuth, (req, res) => {
  const { user, request } = req.body.data;
  RideRequest.addRideRequest(user.uid, request)
    .then((result) => {
      console.log("Rider Requested Success");
      res.status(200).send({
        result: result,
      });
    })
    .catch((err) => {
      console.log("Rider Requested Failed");
      res.send(500).send(err);
    });
});

RiderRouter.delete("/DeleteRide", RouterUtils.requireRiderAuth, (req, res) => {
  const { user } = req.body.data;
  RideRequest.deleteRideRequest(user.uid)
    .then((result) => {
      console.log("Ride request deleted for User");
      res.status(200).send({
        result: result,
      });
    })
    .catch((err) => {
      console.log("Delete Ride Failed");
      res.status(200).send(err);
    });
});

/*
The request for this API:
{
    "data": {
        "user" :{
        	"uid": "1tQD4hCqipXcRPCYGLufuhFijam2",
        	"role": "rider"
        }
    }
}

*/

RiderRouter.get("/GetRide", RouterUtils.requireRiderAuth, (req, res) => {
  const { user } = req.body.data;
  //TODO: verify if the user has added the ride request.
  Transit.getTransitData(user.uid)
    .then((transitData) => {
      return Transit.writeTransitData(transitData);
    })
    .then((transitId) => {
      res.status(200).send(transitId);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(" from the router", err);
    });
});
/*
The API: does following things:
1. Get the potential driver -> can be further changed to get the closest driver
2. 


*/

RiderRouter.get("/FindMatch", RouterUtils.requireRiderAuth, (req, res) => {
  const { user } = req.body.data;
  var riderUID = user.uid;
  var driverPromise = RetriveDrivers.getPotentialDriver(); // gets the driver with cap  more tha 1
  var riderRequestPromise = RetriveRiders.getRiderRequest(user.uid); // will get start and to of the rider.
  var riderRequest;
  var driverUID;
  var driverData;
  Promise.all([driverPromise, riderRequestPromise])
    .then((result) => {
      // if the driver doesnt exists:
      if (result[0].docs.length === 0) {
        throw new Error("Sorry Drivers are not free");
      }
      driverUID = result[0].docs[0].id;
      driverData = result[0].docs[0].data();
      riderRequest = result[1];
      console.log("Potential driver matched: ", driverUID);
      console.log("rider req:", riderRequest);
      return DriverMatch.addRiderToMatchesList(
        driverUID,
        riderUID,
        riderRequest
      );
    })
    .then(() => {
      console.log("Rider matched to driver.");
      return Promise.all([
        RiderStatus.changeRiderStatus(riderUID, Status.MATCHED),
        RiderMatch.addDriverMatched(riderUID,driverUID)
      ])

    })
    .then(() => {
      console.log("Changed Rider status to matched");
      res.status(200).json({
        status: 'success',
        data : driverData
        });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = RiderRouter;
