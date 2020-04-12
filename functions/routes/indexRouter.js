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

router.get("/logout", (req, res) => {
  if (req.cookies && req.cookies.session) {
    const sessionCookie = `${req.cookies.session}`;
    sessions.deleteLoggedInSession(sessionCookie);
  }
  //clear browser cookie and render back home
  res.clearCookie("session");
  res.render("home");
});

router.get("/login-driver", (req, res) => {
  res.render("login", { role: "driver" });
});

router.get("/login-rider", (req, res) => {
  res.render("login", { role: "rider" });
});

router.get("/register-driver", (req, res) => {
  res.render("registerDriver");
});

router.post("/register-and-login-rider", (req, res) => {
  return register(req, res, "/login-rider");
});
router.post("/register-and-login-driver", (req, res) => {
  return register(req, res, "/login-driver");
});
/*
function to register a user- driver or rider

redirect URL redirects to login of corresponding pages.

*/
function register(req, res, redirectURL) {
  var user_data = {
    email: req.body.email,
    pass: req.body.pwd,
    username: req.body.username,
    uin: req.body.uin,
    role: "rider"
  };

  users
    .registerUser(user_data)
    .then(() => {
      console.log("registered User", user_data.email);
      res.redirect(redirectURL);
      return res;
    })
    .catch(error => {
      console.log(error);
      res.status(401).send("UNAUTHORIZED REQUEST!");
      return res;
    });
}

router.get("/register-rider", (req, res) => {
  res.render("registerRider");
});

router.post("/loginDriver", (req, res) => {
  return login(req, res, "driver", '/driver/landing');
});
router.post("/loginRider", (req, res) => {
  return login(req, res, "rider",'/rider/landing');
});


function login(req, res, role,redirectURL) {
  console.log("Request from react \n" + req.body.email + " " + req.body.password);
  data = {
    email: req.body.email,
    pass: req.body.password,
    role: role
  };
  // console.log("role from req", req.body.role);

  const expiresIn = 60 * 5 * 1000;
  let userDetail;
  users
    .loginUser(data)
    .then(user => {
      // Set session expiration to 5 days.

      // Create the session cookie. This will also verify the ID token in the process.
      // The session cookie will have the same claims as the ID token.
      // To only allow session cookie setting on recent sign-in, auth_time in ID token
      // can be checked to ensure user was recently signed in before creating a session cookie.
      let userCookie = firebase_admin
        .auth()
        .createSessionCookie(user.idToken, { expiresIn });
      userDetail = user;
      return userCookie;
    })
    .then(userCookie => {
      userDetail.cookie = userCookie;
      console.log("user details with cookie", userDetail);
      //store user session of logged in user
      let storeSession = sessions.storeSessionData(
        userDetail.cookie,
        userDetail
      );
      return storeSession;
    })
    .then(storeSession => {
      // Set cookie policy for session cookie.
      const options = { maxAge: expiresIn, httpOnly: true };
      res.cookie("session", storeSession.sessionCookie, options);
      
      console.log(redirectURL);
      
      res.send("yes in rider landing");
      
    })
    .catch(error => {
      console.error(error);
      res.status(401).send("UNAUTHORIZED REQUEST!" + error);
      return res;
    });
}

router.get("/driver/landing", (req, res) => {
    if (req.cookies && req.cookies.session && req.cookies.csrfToken) {
      //verify csrf token TODO
      console.log("driver session and csrf verified");
      res.sendFile(require('path').join(__dirname, '../views/loggedInDriver.html'));
      //res.render("loggedInDriver");
    } else {
      res.status(401).send("UNAUTHORIZED REQUEST!");
      return res;
    }
  });

  router.get("/rider/landing", (req, res) => {
    console.log("Inside /rider/landing route");
    console.log(req.cookies + " " + req.cookies.session);
    res.send("inside rider landing");
    // if (req.cookies && req.cookies.session && req.cookies.csrfToken) {
    //   //verify csrf token TODO
    //   console.log("user session and csrf verified");
    //   res.render("loggedInRider");
    // } else {
    //   res.status(401).send("UNAUTHORIZED REQUEST!");
    //   return res;
    // }
    
  });
  
module.exports = router;
