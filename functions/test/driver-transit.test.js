const assert = require('assert');
const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const stoppable = require('stoppable');

const app = require('../app.js');


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
     it("requires the driver to be registered and \
     logged in before searching for riders", async () => {
       // register user
      let registerAccount = axios.post("/register-driver", {
        email : "abc@xyz.com", 
        password : "Hell0", 
      });
      registerAccount.then(()=>{
        let response = axios.post("/login-driver", {
          email : "abc@xyz.com",
          password : "Hell0"
        });
        return response;
      }).then((response)=>{
        assert(response.data.includes("Welcome"));
        return;          
      })
       .catch(()=>{
      return
    });      
    });

    it("lets a driver start a ride", async () => {
      const startPickup = axios.post('/readyPickup');
      startPickup.then((response) => {
        assert(responseReady.data.includes('Start the ride'));
        return;  
      })
       .catch(()=>{
        return;
      }); 

    });
    it("ensures the database reflects the \
    driver's current seat capacity remaining");

    
    it("notifies a driver of the nearest rider request"); 
    it("allows a driver to accept/deny request");

    it("lets a driver pick up a rider", async () => {
      axios.post("driver/ReadyToPick", {
        uid: "v5KRTG"
      })
          .then((response) => {
            assert(response.status === 200);
          })
          .catch((err) => {
            console.error(err);
          })
    });

    it("ensures the database reflects the \
    driver's current transit status");

    it("lets a driver drop off a rider", async () => {
      axios.post("/driver/EndRide", {
        uid: 'e745hy'
      })
          .then((response) => {
            assert(response.status === 200);
          })
          .catch((err) => {
        console.error(err);
      });
    });
  });
});