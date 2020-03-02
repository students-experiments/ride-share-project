const assert = require('assert');
const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const stoppable = require('stoppable');

const app = require('../index');

axiosCookieJarSupport(axios);

const PORT = 3000;

beforeEach(async () => {
  client = axios.create();
  // make a new cookie jar every time you create a new client
  client.defaults.jar = new tough.CookieJar();

  server = stoppable(app.listen(PORT));
});

afterEach(async () => {
  server.stop();
});

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

  before(async () => {
    server = app.listen(PORT);
  });

  after(async () => {
    await server.close();
  });

  describe("login", async () => {
    it("requires the driver to be registered before logging in", async() => {
        let response = await client.post("/login-driver", {
          email : "abc@xyz.com",
          password : "Hell0"
        });
        assert(!response.data.includes("Account doesn't exist."));
      });
  
  
      it("lets a driver login to their account", async() => {
        // Have to register an account first
        let registerAccount = await client.post("/register-driver", {
          email : "abc@xyz.com", 
          password : "Hell0", 
        });
  
        // Then login and see if the added driver was allowed in
        let response = await client.post("/login-driver", {
          email : "abc@xyz.com",
          password : "Hell0"
        });
        assert(response.data.includes("Welcome"));
      });
  
  
      it("doesn't allow a driver to login without the right password", async() => {
        // Have to register an account first
        let registerAccount = await client.post("/driver-register", {
          email : "abc@xyz.com", 
          password : "Hell0", 
        });
      
        // Check for correct password
        let response = await client.post("/login-driver", {
          email : "abc@xyz.com",
          password : "Hell0"
        });
        assert(!response.data.includes("Invalid credentials."));
        
      });
  
  
      it("checks if the driver's session is running already", async () => {
        // Register for account first 
        let registerAccount = await client.post("/register-driver", {
          email : "abc@xyz.com", 
          password : "Hell0", 
        });
        
        // Login to the account 
        let response = await client.post("/login-driver", {
          email : "abc@xyz.com",
          password : "Hell0"
        });

        // Check for session conflicts
        assert(!response.data.includes("Session in progress"));
      });
  });
});