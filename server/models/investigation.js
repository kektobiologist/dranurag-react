// models/patient.js
var mongoose = require("mongoose");
import { autoIncrement } from "mongoose-plugin-autoinc";

var moment = require("moment");
var AC_Test = require("./autocomplete/test");

var investigationSchema = mongoose.Schema({
  patient: { type: Number, ref: "Patient" },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  units: {
    type: String,
    required: false
  },
  cat: {
    type: String,
    required: false
  },
  value: {
    type: String,
    required: true
  }
});

investigationSchema.post("save", function(doc) {
  // save test in autocomplete table
  // direct object matching not working? probably cuz investigationSchema has ObjectId..
  AC_Test.findOneAndUpdate(
    {
      "val.name": doc.name,
      "val.units": doc.units,
      "val.cat": doc.cat
    },
    {
      $inc: { freq: 1 }
    },
    {
      upsert: true,
      setDefaultsOnInsert: true,
      new: true
    }
  ).exec();
});

investigationSchema.plugin(autoIncrement, {
  model: "Investigation",
  startAt: 1000
});

module.exports = mongoose.model("Investigation", investigationSchema);
