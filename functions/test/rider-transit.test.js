const assert = require('assert');
const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const stoppable = require('stoppable');

const app = require('../index.js');


axiosCookieJarSupport(axios);


beforeEach(async () => {
  client = app;
});

function handleError(error){
  // Handle Errors here.
  let errorCode= 404;
  if(error.code)
      errorCode = error.code;
  var errorMessage = error.message;

  console.log(errorCode);
  console.log(errorMessage);
}

describe('application', async () => {
  /* fill these in before each test */
  let server = {};
  let client = {};

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = `https://uic-rider.firebaseapp.com`;
  axios.defaults.validateStatus = () => true;

  /* Utility functions
   */
  // Deterministic (for testing) Math.random replacement
  // https://gist.github.com/mathiasbynens/5670917

  const psrand = (() => {
    let seed = 0xaabbccd;
    return () => {
      /* eslint-disable no-bitwise */
      // Robert Jenkins’ 32 bit integer hash function
      seed = (seed + 0x7ed55d16 + (seed << 12)) & 0xffffffff;
      seed = (seed ^ 0xc761c23c ^ (seed >>> 19)) & 0xffffffff;
      seed = (seed + 0x165667b1 + (seed << 5)) & 0xffffffff;
      seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
      seed = (seed + 0xfd7046c5 + (seed << 3)) & 0xffffffff;
      seed = (seed ^ 0xb55a4f09 ^ (seed >>> 16)) & 0xffffffff;
      return (seed & 0xfffffff) / 0x10000000;
      /* eslint-enable no-bitwise */
    };
  })();

  // https://gist.github.com/6174/6062387#gistcomment-2915959
  function getRandomString(length) {
    let s = '';
    do {
      s += psrand()
        .toString(36)
        .substr(2);
    } while (s.length < length);
    s = s.substr(0, length);
    return s;
  }

  describe("transit", async () => {
    it("requires the rider to be registered and \
    logged in before requesting a ride");
    it("lets a rider request a ride");  
    it("lets a rider state their location");  
    it("lets the rider know when a driver accpets the request");
    it("lets the rider see the time until pickup"); 
    it("lets the rider cancel the ride");
    it("lets the rider know of driver status");  
    it("updates the DB rider transit status once ride is over");
    it("sends a user back to the \"Request a Ride\" page \
    after ride finishes");
  });
});