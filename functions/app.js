const functions = require("firebase-functions");
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const riderRouter = require("./routes/riderRouter");
const driverRouter = require("./routes/driverRouter");
const newRouter =require( './routes/newRouter');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors({ origin: true }));
app.use(bodyParser.json());
// Support URL-encoded bodies.
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// Support cookie manipulation.
app.use(cookieParser());
// Attach CSRF token on each request.
app.use(
  attachCsrfToken(
    "/",
    "csrfToken",
    (Math.random() * 100000000000000000).toString()
  )
);

function attachCsrfToken(url, cookie, value) {
  return function(req, res, next) {
    if (req.url === url) {
      res.cookie(cookie, value);
    }
    next();
  };
}

app.set("views", "./views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

app.use("/", newRouter);

exports.app = functions.https.onRequest(app);
