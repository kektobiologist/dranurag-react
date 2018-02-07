// models/prescription.js
var mongoose = require("mongoose");
import { autoIncrement } from "mongoose-plugin-autoinc";

var DurationSchema = mongoose.Schema(
  { number: String, type: String },
  { typeKey: "$type" }
);

var DrugSchema = mongoose.Schema({
  id: String,
  name: String,
  composition: [String],
  frequency: String,
  dosage: String,
  specialComments: String,
  duration: DurationSchema,
  // drugMeta is required when copying over previous prescription
  drugMeta: {}
});

var PrescriptionSchema = mongoose.Schema({
  patient: { type: Number, ref: "Patient", required: true },
  selectedDrugs: [DrugSchema],
  translatedDrugs: [DrugSchema],
  language: String,
  date: Date,
  review: DurationSchema,
  reviewAfterResults: Boolean,
  diagnosis: String
});

PrescriptionSchema.pre("save", function(next) {
  this.date = new Date();
  next();
});

PrescriptionSchema.plugin(autoIncrement, {
  model: "Prescription",
  startAt: 1000
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
