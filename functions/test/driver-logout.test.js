// Import the dependencies for testing
const assert = require('assert');
const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const stoppable = require('stoppable');

const app = require('../index.js');

const firebase_admin = require("firebase-admin")

const admin_config={
    credentials:firebase_admin.credential.applicationDefault(),
    databaseURL: "https://uic-rider.firebaseio.com"
}

firebase_admin.initializeApp(admin_config);

axiosCookieJarSupport(axios);

const PORT = 5000;

beforeEach(async () => {
  client = axios.create();
  // make a new cookie jar every time you create a new client
  client.defaults.jar = new tough.CookieJar();

  // server = stoppable(app.listen(PORT));
  });

// afterEach(async () => {
//   server.stop();
// });

describe('application', async () => {
  /* fill these in before each test */
  let server = {};
  let client = {};

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = `http://localhost:${PORT}/`;
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

  // before(async () => {
  //   server = app.listen(PORT);
  // });

  // after(async () => {
  //   await server.close();
  // });

  describe("logout", async () => {
    it("lets a driver logout", async () => {
      const response = await client.post('/logout-driver');
      assert(response.data.includes('Login to your Account'));
    });

    it("requires a driver to be logged in while logging out", async () => {
      // From the driver landing page, hit the "ready to pickup" button, go to the next page
      // If the user is logged in then the next page will have the option to start the ride. 
      // Then on the next page hit logout. If logged out successfully then the user is sent to the login page.
      const responseReady = await client.post('/readyPickup');
      assert(responseReady.data.includes('Start the ride'));

      const responseLogout = await client.post('/logout');
      assert(responseLogout.data.includes('Login to your Account'))
    });

    it("requires the transit status in the database to be consistent with the actual current transit status of the user", async () => {
      
      // const db = firebase_admin.firestore();

      // const transitList = db.collection("roles").doc("rider-status").get();

      // transitList
      // .then((response) => {
      //     assert(response.exists);
      //     let currentStatus = response.data().onTransit;
      //     let 
      //     return;
      // })

    });
  });
});