// Import the dependencies for testing
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

  async function createRandomUser() {
    const newUser = {
      email: getRandomString(5) + '@' + getRandomString(5) + '.com',
      password: getRandomString(10),
    };
    axios.post('/register-driver', newUser)
    .then((response) => {
      return {newUser, response};
    })
    .catch((error)=>{
      console.log(error);
      handleError(error);
  });
  }

  describe("register", async () => {
    it("lets a driver create an account", async () => {
      axios.get("/register-driver", {
        email : "abc@xyz.com",
        password : "Hell0"
      })
      .then((response) => {
        assert(!response.data.includes("Ride in progress"));
        return;
      })
      .catch(()=>{
        return
      });
    });


    it("doesn't allow duplicate usernames", async () => {
      const {driver1, response1} =  createRandomUser();
      
      axios.post('/register-driver', driver1)
      .then((response) => {
        assert(!response.data.includes('Welcome'));
        assert(response.data.includes('That username is already taken'));
        return;
      })
       .catch(()=>{
        return
      });
    });

    it("doesn't allow a driver to create an account with a weak password", async () => {
      axios.post('/register-driver', {
        email: 'abc@xyz.com',
        password: '123456'
      })
      .then((response) => {
        assert(!response.data.includes('Welcome'));
        assert(
          response.data.includes(
            'Weak Password. The password must contain at least 8 characters and at least one special character'
          )
        );
        return;
      })
       .catch(()=>{
        return
      });
    });

    it("doesn't allow a driver to create an account with an invalid password", async () => {
      axios.post('/register-driver', {
        email: 'abc@xyz.com',
        password: '123 456'
      })
      .then((response) => {
        assert(!response.data.includes('Welcome'));
        assert(response.data.includes('Enter a valid password'));
        return;
      })
       .catch(()=>{
        return
      });
    });
  });
});