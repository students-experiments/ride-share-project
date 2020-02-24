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
  // TODO: send the HTML of the home page if the user is not logged in,
  // and send the contents of the logged in page if the user is logged in.

  // This is the mock response, remove it when you add your own response.
  sendLoggedOut(res);
}); 
module.exports = router;
