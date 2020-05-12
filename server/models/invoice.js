// models/invoice.js

var mongoose = require("mongoose");
var moment = require("moment-timezone");
import { autoIncrement } from "mongoose-plugin-autoinc";

var schema = mongoose.Schema(
  {
    patient: { type: Number, ref: "Patient", required: true },
    date: { type: Date, required: true },
    paymentMode: { type: String, enum: ['CASH', 'PAYTM', 'UPI', 'CARD'], default: 'CASH' },
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

schema.plugin(autoIncrement, { model: "Invoice", startAt: 1000 });

module.exports = mongoose.model("Invoice", schema);
