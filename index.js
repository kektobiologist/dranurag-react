const express = require("express");
var mongoose = require("mongoose");
// configuration ===============================================================
var connection = mongoose.connect("mongodb://localhost/dranurag"); // connect to our database
// use js promise
mongoose.Promise = global.Promise;
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(connection);

var Visit = require("./server/models/visit");
var Patient = require("./server/models/patient");

const app = express();

var moment = require("moment");

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/visits", (req, res) => {
  Visit.find()
    .limit(10)
    .populate("patient")
    .exec()
    .then(visits => visits.filter(visit => visit.patient))
    .then(visits => {
      return visits.map(e => {
        helpText = e.patient.getHelpText();
        e = e.toObject();
        e.ago = moment(e.date).fromNow();
        e.helpText = helpText;
        return e;
      });
    })
    .then(docs => {
      res.json(docs);
    });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
