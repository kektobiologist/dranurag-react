const express = require("express");
const path = require("path");

var mongoose = require("mongoose");
// configuration ===============================================================
var connection = mongoose.connect(process.env.MONGODB_URI); // connect to our database
// use js promise
mongoose.Promise = global.Promise;
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(connection);
var bodyParser = require("body-parser");
var flash = require("connect-flash");

var Visit = require("./server/models/visit");
var Patient = require("./server/models/patient");
var PicturePrescription = require("./server/models/picturePrescription");

const app = express();
app.use(express.static("server/public"));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var moment = require("moment");

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
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
if (process.env.PROD == true) {
  console.log("prod env");
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
