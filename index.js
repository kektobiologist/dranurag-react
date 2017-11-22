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
var PicturePrescription = require("./server/models/picturePrescription");

const app = express();

var moment = require("moment");

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/visits", (req, res) => {
  Visit.find()
    .populate("patient")
    .populate("patient.age")
    .exec()
    .then(visits => visits.filter(visit => visit.patient))
    .then(visits => {
      return visits.map(e => {
        console.log(e);
        helpText = e.patient.getHelpText();
        e = e.toObject();
        e.ago = moment(e.date).fromNow();
        e.helpText = helpText;
        return e;
      });
    })
    .then(docs => {
      // setTimeout(() => res.json(docs), 2000);
      res.json(docs);
    });
});

app.get("/api/patient/:id", (req, res) => {
  const { id } = req.params;
  Patient.findOne({ _id: parseInt(id) })
    .exec()
    .then(doc => {
      // setTimeout(() => res.json(doc), 1000);
      res.json(doc);
    });
});

app.get("/api/patientPrescriptions/:id", (req, res) => {
  const { id } = req.params;
  PicturePrescription.find({ patient: parseInt(id) })
    .sort({ timestamp: -1 })
    .exec()
    .then(docs => {
      res.json(docs);
    });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
