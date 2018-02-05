// models/invoice.js

var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
var moment = require("moment-timezone");

var schema = mongoose.Schema(
  {
    patient: { type: Number, ref: "Patient", required: true },
    date: { type: Date, required: true },
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
// it uses local timezone, so need to specify india timezone separately
// done globally in index.js
schema.virtual("dateString").get(function() {
  return moment(new Date(this.date)).format("YYYY-MM-DD");
});

schema.plugin(autoIncrement.plugin, { model: "Invoice", startAt: 1000 });

module.exports = mongoose.model("Invoice", schema);
