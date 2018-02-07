const path = require("path");
if (process.env.NODE_ENV != "production")
  var configVars = require("dotenv").config({
    path: path.join(__dirname, "./.env.dev")
  });
const express = require("express");
const pause = require("connect-pause");
var mongoose = require("mongoose");
// configuration ===============================================================
var connection = mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
}); // connect to our database
// use js promise
mongoose.Promise = global.Promise;
var bodyParser = require("body-parser");
var flash = require("connect-flash");

var Visit = require("./server/models/visit");
var Patient = require("./server/models/patient");
var PicturePrescription = require("./server/models/picturePrescription");

const app = express();
app.use(express.static("server/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
var moment = require("moment-timezone");
// setting default timezone here to kolkata. All instances of moment will use this tz.
moment.tz.setDefault("Asia/Kolkata");

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add latency for testing
// if (process.env.ADD_LATENCY) {
//   app.use(pause(500));
// }
// session and passport stuff
var session = require("express-session");
const MongoStore = require("connect-mongo")(session);

var passport = require("passport");
require("./server/auth/passport")(passport);
app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

require("./server/api/auth")(app);
require("./server/api/api")(app);

// after api and auth routes so that doesn't mess with them?
if (process.env.NODE_ENV == "production") {
  console.log("prod env");
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

// for use in testing
module.exports = app;
