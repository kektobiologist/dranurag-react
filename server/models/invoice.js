// models/invoice.js

var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
var moment = require("moment");

var schema = mongoose.Schema(
  {
    patient: { type: Number, ref: "Patient", required: true },
    timestamp: Number,
    amount: Number // in rupees obviously
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

// moment js seems to be aware of timezone when formatting dates?
schema.virtual("dateString").get(function() {
  return moment(new Date(this.timestamp)).format("MM-DD-YYYY");
});

schema.plugin(autoIncrement.plugin, { model: "Invoice", startAt: 1000 });

module.exports = mongoose.model("Invoice", schema);
