// models/picture_prescription.js
// load the things we need
var mongoose = require("mongoose");
import { autoIncrement } from "mongoose-plugin-autoinc";
var moment = require("moment");

var schema = mongoose.Schema(
  {
    patient: { type: Number, ref: "Patient", required: true },
    url: String,
    date: Date
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

schema.virtual("title").get(function() {
  return moment(this.date).format("MMMM Do, YYYY");
});

schema.pre("save", function(next) {
  this.date = new Date();
  next();
});

schema.plugin(autoIncrement, { model: "PicturePrescription", startAt: 1000 });

module.exports = mongoose.model("PicturePrescription", schema);
