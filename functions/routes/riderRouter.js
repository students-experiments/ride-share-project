const express = require("express");

const router = express.Router();
//TODO: move route handles here for rider
router.get("/rider/landing", (req, res) => {
  if (req.cookies && req.cookies.session && req.cookies.csrfToken) {
    //verify csrf token TODO
    console.log("user session and csrf verified");
    res.render("loggedInRider");
  } else {
    res.status(401).send("UNAUTHORIZED REQUEST!");
    return res;
  }
});

module.exports = router;
