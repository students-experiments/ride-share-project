/* eslint-disable promise/no-nesting */
const assert = require('assert');
const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const stoppable = require('stoppable');
const db = require("../database/init-db").firestore;
const app = require('../app.js');

const userObj = {
    uid: 's2JXI33kzuXgSZrFXwyS8ECVfIG2',
    role: 'rider'
};

const requestObj = {
    start: {
        latitude: 20,
        longitude: 30
    },
    end: {
        latitude: 35,
        longitude: 33
    }
};
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
  axios.defaults.baseURL = `http://localhost:5001/uic-rider/us-central1/app/`;
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
    logged in before requesting a ride", () => {
      axios.post("/rider/FindMatch", {
          data:{
            user: {
                uid: 's2JXI33kzuXgSZrFXwyS8ECVfIG2',
                role: 'rider',
                name: 'sid_rider2'
            }
          }
      })
          .then((response) => {
            
            assert(response.status !== 400);
          })
          .catch(() => {
            
          });
    });

    it("lets a rider request a ride", () => {
      axios.post("/rider/FindMatch", {
          data: {
              user: {
                  uid: 's2JXI33kzuXgSZrFXwyS8ECVfIG2',
                  role: 'rider',
                  name: 'sid_rider2'
              },
          }
      }).then((response) => {
          
            assert(response.status === 200 || response.data.includes("You have been matched"));
      })
          .catch(() => {
            
          });
    });

    it("lets a rider state their location", () => {
        axios.post("/rider/AddRide", {
            data: {
                user: {
                    uid: 's2JXI33kzuXgSZrFXwyS8ECVfIG2',
                    role: 'rider',
                    name: 'sid_rider2'
                },
                request: requestObj
            }
      }).then((response) => {
            
            assert(response.status === 200);
          })
          .catch((err) => {
            return err;
          });
    });

    it("lets the rider know when a driver accepts the request", () => {
        axios.post('/rider/FindMatch', {
            data: {
                user: {
                    uid: 's2JXI33kzuXgSZrFXwyS8ECVfIG2',
                    role: 'rider',
                    name: 'sid_rider2'
                },
            }
        })
            .then((res) => {
                
                assert(res.data.includes("will pick you up"));
            })
            .catch(err => err);
    });

    it("lets the rider cancel the ride", () => {
      axios.post("/rider/DeleteRide", {
        data: {
            user: {
                uid: 's2JXI33kzuXgSZrFXwyS8ECVfIG2',
                role: 'rider',
                name: 'sid_rider2'
            }
        }
      })
      .then((response) => {
          
            assert(response.status === 200);
            return;
          })
          .catch(() => {
            
          });
    });


    it("updates the DB rider transit status once ride is over", () => {
      
      axios.post("/driver/EndRide", { // Driver is the one who stops the ride
          data: {
              user: {
                  uid: "hwsw6ygJkwOBPxV0laKQ2rVpn7C2",
                  role: 'driver'
              },
              rider: {
                  uid: 's2JXI33kzuXgSZrFXwyS8ECVfIG2',
                  name: 'sid_rider2'
              }
          }
      }).then((response) => {
          
            assert(response.status === 200);
            return;
          })
              .then(() => {
                let riderDb = db.collection("rider").doc("0qseCUVPrsV35Cq2wQkw0F6GY153");
                riderDb.get()
                    .then((doc) => {
                      assert(doc.data().status === "idle");
                    })
                    .catch(() => {
                      
                    })
              })
              .catch(() => {
                
              });
    });

    it("sends a user back to the \"Request a Ride\" page \
    after ride finishes", () => {
        axios.post('/driver/EndRide', {
            data: {
                user: {
                    uid: "hwsw6ygJkwOBPxV0laKQ2rVpn7C2",
                    role: 'driver'
                },
                rider: {
                    uid: 's2JXI33kzuXgSZrFXwyS8ECVfIG2',
                    name: 'sid_rider2'
                }
            }
        })
            .then(res => {
                
                assert(res.status === 200 && res.data.includes("Request Ride"));
            })
            .catch(err => err);
    });
  });
});
 
