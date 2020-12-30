import 'idempotent-babel-polyfill'; // bullshit

const path = require("path");
if (process.env.NODE_ENV == "development")
  var configVars = require("dotenv").config({
    path: path.join(__dirname, "../.env.dev")
  });

const express = require("express");
const pause = require("connect-pause");
var mongoose = require("mongoose");
console.log(process.env.MONGODB_URI)
// configuration ===============================================================
var connection = mongoose.connect(process.env.MONGODB_URI); // connect to our database
// use js promise
mongoose.Promise = global.Promise;
var bodyParser = require("body-parser");
var flash = require("connect-flash");

var Visit = require("./models/visit");
var Patient = require("./models/patient");
var PicturePrescription = require("./models/picturePrescription");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
var moment = require("moment-timezone");
// setting default timezone here to kolkata. All instances of moment will use this tz.
moment.tz.setDefault("Asia/Kolkata");

app.set("port", process.env.PORT || 3001);

// Add latency for dev testing
if (process.env.ADD_LATENCY) {
  app.use(pause(500));
}
// session and passport stuff
var session = require("express-session");
const MongoStore = require("connect-mongo")(session);

var passport = require("passport");
require("./auth/passport")(passport);
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

require("./api/auth")(app);
require("./api/api")(app);

// after api and auth routes so that doesn't mess with them?
if (process.env.NODE_ENV == "production") {
  console.log("prod env");
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

// for use in testing
module.exports = app;
