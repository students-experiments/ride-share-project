
const express = require("express");
const users = require("../database/firestore/auth/Users.js");
const firebase_admin = require("../database/init-db").firebase_admin;
const sessions = require("../database/firestore/auth/session");
const router = express.Router();
const Claims =require('../database/firestore/user/Claims');
const DriverStatus = require ('../database/firestore/driver/ChangeStatus');
const CommonStatus = require ('../database/firestore/common/Status');
const Status =require('../status/status');

const AddDriverLocation_FireStore= require('../database/firestore/driver/AddDriverLocation')

const ClosestDriver= require('../database/firestore/driver/RetriveDrivers');

const RideRequest= require('../database/firestore/rider/RideRequest');
 
const RetriveDrivers = require( '../database/firestore/driver/RetriveDrivers');

/*





THIS FILE IS NOT BEING USED. STILL HERE BECAUSE IT CONTAINS SOME IMP API'S. TAking caution before deletion








*/

router.get("/",(req, res, next) => {
    if (req.cookies && req.cookies.session) {
      const sessionCookie = `${req.cookies.session}`;
      // Verify the session cookie. In this case an additional check is added to detect
      // if the user's Firebase session was revoked, user deleted/disabled, etc.
      firebase_admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then(decodedClaims => {
          console.log("cookies are set for user:", decodedClaims.cookie);
          next();
        })
        .catch(error => {
          // Session cookie is unavailable or invalid. Force user to login.
          console.log(error);
          res.render("home");
        });
    } else {
      console.log("no cookies set");
      res.render("home");
    }
    // handler for next() -> middleware.
  },
  (req, res) => {
    const session = `${req.cookies.session}`;

    sessions
      .getSessionRole(session)
      .then(role => {
        if (role === "rider") {
          res.redirect("/rider/landing");
        } else {
          //res.redirect("/driver/landing");
          res.sendFile(require('path').join(__dirname, '../views/loggedInDriver.html'));
        }
      })
      .catch(error => {
        console.log(error);
        res.render("home");
      });
  }
);
function isRequestUidValid(req){
  if(!req.body.data.user.uid){
    return false;
  } 
  return true;
}

function requireDriverAuth (req,res,next){

  if( isRequestUidValid(req) && req.body.data.user.role !== 'driver')
  {
    res.send(400);
  }
  else{
    
    console.log("authorised Driver :",req.body.data.user)
    // eslint-disable-next-line callback-return
    next();
  }

}
function requireRiderAuth (req,res,next){

  if( isRequestUidValid(req) && req.body.data.user.role !== 'rider') 
  {
    res.send(400);
  }
  else{
    console.log("authorised Driver :",req.body.data.user)
    // eslint-disable-next-line callback-return
    next();
  }

}
function requireUser (req,res,next){
  data=req.body.data;
  if(! isRequestUidValid(req))
  {
    res.send(400);
  }
  else{
    
    console.log("authorised user :",data.uid)
    // eslint-disable-next-line callback-return
    next();
  }

}
router.post("/addUserClaims",requireUser, (req,res)=>{
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
router.post('/driver/AddLocation',requireDriverAuth,(req,res)=>{
  const {user, location} = req.body.data;
  AddDriverLocation_FireStore.writeDriverLocation(user.uid,location)
  .then(()=>{
    console.log("Added Driver Location");
    res.sendStatus(200);
  }).catch((err)=>{
    console.log(err);
    res.status(404).send(err)
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
})
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
router.post('/driver/ReadyToPick',requireDriverAuth,(req,res)=>{
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
router.get('/driver/GetClosestDrivers',requireDriverAuth,(req,res)=>{
  const {user} = req.body.data;
  ClosestDriver.GetClosestDrivers();
  res.status(200)
  
})

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
*/
router.post('/rider/AddRide',requireRiderAuth,(req,res)=>{
  const {user,request} = req.body.data;
  RideRequest.addRideRequest(user.uid,request)
  .then((result)=>{
    console.log('Rider Requested Success');
    res.status(200).send({
      result: result
    })
  })
  .catch((err)=>{
    console.log('Rider Requested Failed');
    res.send(500).send(err);
  })
})
router.post('/rider/DeleteRide',requireRiderAuth,(req,res)=>{
  const {user} = req.body.data;
  RideRequest.deleteRideRequest(user.uid)
  .then((result)=>{
    console.log('Ride request deleted for User');
    res.status(200).send({
      result: result
    })
  })
  .catch((err)=>{
    console.log('Delete Ride Failed');
    res.status(200).send(err);
  })
})



router.get('/driver/GetIdleDrivers',(req,res)=>{
  RetriveDrivers.getIdleDrivers();
  res.sendStatus(200);
})


  
module.exports = router;
