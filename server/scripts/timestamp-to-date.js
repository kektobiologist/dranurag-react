import "babel-polyfill"; // bullshit
var path = require("path");
// need prod env to edit prod database. use carefully!
var configVars = require("dotenv").config({
  path: path.join(__dirname, "../../.env.dev")
});
const db = require("monk")(process.env.MONGODB_URI);
const patients = db.get("patients");
const prescriptions = db.get("prescriptions)");
const scannedPrescriptions = db.get("pictureprescriptions");

var moment = require("moment");

var changeCollection = collection => {
  collection
    .find({})
    .then(docs => {
      return Promise.all(
        docs.map(({ _id, timestamp }) =>
          collection.findOneAndUpdate(
            { _id },
            { $set: { date: new Date(timestamp) }, $unset: { timestamp: "" } }
          )
        )
      );
    })
    .then(promises => console.log("done"));
};

changeCollection(scannedPrescriptions);
changeCollection(prescriptions);
