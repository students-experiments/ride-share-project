const express = require("express");
const RiderRouter = express.Router();
const RideRequest = require("../database/firestore/rider/RideRequest");
const Transit = require("../database/firestore/common/Transit");
const RouterUtils =require('./utils');

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




module.exports = RiderRouter;
