const express = require("express");
var mongoose = require("mongoose");
// configuration ===============================================================
var connection = mongoose.connect("mongodb://localhost/dranurag"); // connect to our database
// use js promise
mongoose.Promise = global.Promise;
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(connection);
var bodyParser = require("body-parser");

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

require("./server/api/api")(app);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
