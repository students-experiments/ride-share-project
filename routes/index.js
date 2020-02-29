const express = require('express');
const path = require('path');
const session = require('express-session');


const sendLoggedOut = (res) => {
  res.sendFile(path.join(__dirname, '../static/home.html'));
};

const router = express.Router();

// Reference : Express session site
router.use(
  session({
    cookie: {
      maxAge: 60000,
    },
    secret: 'mySecret',
  }),
);


/* GET home page. */
router.get('/', (req, res) => {
  // Send home page
  res.render('home');
}); 

router.post('/homeDriver', (req, res) => {
  res.render('homeDriver');
});

router.post('/homeRider', (req, res) => {
  res.render('homeRider');
});

router.post('/registerRider', (req, res) => {
  // Send rider registration page
  res.render('registerRider');
});

router.post('/registerDriver', (req, res) => {
  // Send driver registration page
  res.render('registerDriver');
});

router.post('/loginRider', (req, res) => {
  // Send rider registration page
  res.render('loggedInRider', {
    username: req.body.username
  });
});

router.post('/requestRide', (req, res) => {
  res.render('searchRide');
});

router.post('/loginDriver', (req, res) => {
  res.render('loggedInDriver', {
    username: req.body.username
  });
});

// Add routes for register (driver and rider)
module.exports = router;
