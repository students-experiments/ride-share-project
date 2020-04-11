const express = require("express");
const users = require("../firebase-db/auth/Users.js");
const firebase_admin = require("../firebase-db/init-db").firebase_admin;
const sessions = require("../firebase-db/auth/session");
const router = express.Router();
const Claims =require('../firebase-db/user/Claims');
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
function requireUser (req,res,next){
  if(!req.body.data.user)
  {
    res.send(400);
  }
  else{
    // eslint-disable-next-line callback-return
    next();
  }

}
router.post("/addUserClaims",requireUser, (req,res)=>{
  const {user, claims}= req.body.data;
  console.log('req recieved:', req.body.data);
  Claims.setCustomUserClaims(user,claims)
  .then(()=>res.sendStatus(200))
  .catch((err)=>{ 
    console.log(err);
    res.status(404).send(err)})
 
});

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
