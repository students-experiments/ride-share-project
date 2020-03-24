const express = require("express");

const router = express.Router();
//TODO: move route handles here for driver

router.get("/driver/landing", (req, res) => {
  if (req.cookies && req.cookies.session && req.cookies.csrfToken) {
    //verify csrf token TODO
    console.log("driver session and csrf verified");
    res.render("loggedInDriver");
  } else {
    res.status(401).send("UNAUTHORIZED REQUEST!");
    return res;
  }
});
module.exports = router;
