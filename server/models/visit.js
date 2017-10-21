// models/visit.js
// Visit is just (patientId, datetime)
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var visitSchema = mongoose.Schema({
  patient: {type: Number, ref: 'Patient', required: true},
  date: {type: Date, required: true}
});

visitSchema.statics.addVisit = function(req, patientModel, visitModel, patientId) {
  if (!patientId) {
    req.flash("error", "No patient ID given.")
  } else {
    return patientModel.findOne({_id: patientId})
    .then((patient) => {
      if (!patient) {
        throw {message: "Patient does not exist."}
      }
      return new visitModel({
        patient: patientId,
        date: new Date()
      }).save()
    }).then((visit) => {
      req.flash("info", "Added new visit for patient <strong>" + visit.patient +"</strong>.")
    }).catch((err) => {
      req.flash("error", err.message)
    })
  }
}
visitSchema.plugin(autoIncrement.plugin, { model: 'Visit', startAt: 1000 });


module.exports = mongoose.model('Visit', visitSchema);
