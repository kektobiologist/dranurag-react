// models/prescription.js
var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

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
  reviewAfter: DurationSchema
});

PrescriptionSchema.plugin(autoIncrement.plugin, {
  model: "Prescription",
  startAt: 1000
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
