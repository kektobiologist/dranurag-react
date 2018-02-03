// models/invoice.js

var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

var schema = mongoose.Schema({
  patient: { type: Number, ref: "Patient", required: true },
  timestamp: Number,
  amount: Number // in rupees obviously
});

schema.plugin(autoIncrement.plugin, { model: "Invoice", startAt: 1000 });

module.exports = mongoose.model("Invoice", schema);
