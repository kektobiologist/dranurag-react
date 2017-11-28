// models/visit.js
// Visit is just (patientId, datetime)
var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

var visitSchema = mongoose.Schema({
  patient: { type: Number, ref: "Patient", required: true },
  date: { type: Date, required: true }
});

visitSchema.statics.addVisit = function(patientModel, visitModel, patientId) {
  if (!patientId) {
  } else {
    return patientModel.findOne({ _id: patientId }).then(patient => {
      if (!patient) {
        throw { message: "Patient does not exist." };
      }
      return new visitModel({
        patient: patientId,
        date: new Date()
      }).save();
    });
  }
};
visitSchema.plugin(autoIncrement.plugin, { model: "Visit", startAt: 1000 });

module.exports = mongoose.model("Visit", visitSchema);
