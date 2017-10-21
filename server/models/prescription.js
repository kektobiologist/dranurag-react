// models/prescription.js
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var _ = require('lodash')
const {Drug, Frequency, Duration, SpecialAdvice} = require('./autocomplete/medicineAdvice')

var medicineAdviceSchema = mongoose.Schema({
    drug: String,
    drugConstituents: String,
    frequency: String,
    duration: String,
    specialAdvice: String
})

medicineAdviceSchema.methods.getText = function () {
  return this.drug +  ", " + this.drugConstituents + ', ' + this.frequency + ", " + this.duration + ", " + this.specialAdvice
}

medicineAdviceSchema.post('save', function(doc) {
  // add medicine advice entries to autocomplete collections
  console.log("saving medicine advice")
  const {drug, frequency, duration, specialAdvice} = doc
  _.zip([drug, frequency, duration, specialAdvice], [Drug, Frequency, Duration, SpecialAdvice])
   .filter(([val, model]) => val) // only non empty val's should be added
   .map(([val, model]) => {
      model.findOneAndUpdate({val: val}, {$inc: {freq: 1}}, {upsert: true, setDefaultsOnInsert: true, new: true})
        .exec()
   })
})

var prescriptionSchema = mongoose.Schema({
    patient: {type: Number, ref: 'Patient', required: true},
    date: Date,
    diagnosis: [String],
    chiefComplaints: [String],
    onExaminationPulse: String,
    onExaminationBp1: String,
    onExaminationBp2: String,
    onExaminationTemp: String,
    onExaminationNotes: [String],
    investigationsRequired: [String],
    medicineAdvice: [medicineAdviceSchema],
    dietaryAdvice: [String],
    otherAdvice: [String],
    reviewAfterNumber: Number, // use duration?,
    reviewAfterType: String
});

prescriptionSchema.post('save', function(doc) {
  let Investigation = require('./autocomplete/investigation')
  let {Dietary, Other} = require('./autocomplete/treatmentAdvice')
  let Diagnosis = require('./autocomplete/diagnosis')
  let Symptom = require('./autocomplete/symptom')
  // add investigations required entries to autocomplete table
  // add dietary advice and other advice entries to autocompelte table
  let {investigationsRequired, dietaryAdvice, otherAdvice, diagnosis, chiefComplaints} = doc
  _.zip([investigationsRequired, dietaryAdvice, otherAdvice, diagnosis, chiefComplaints], [Investigation, Dietary, Other, Diagnosis, Symptom])
   .map(([elms, model]) => {
      elms.filter(elm => elm).map(elm => {
        // console.log(elm)
        model.findOneAndUpdate({val: elm}, {$inc: {freq: 1}}, {upsert: true, setDefaultsOnInsert: true, new: true})
          .exec()
      })
   })
})



prescriptionSchema.plugin(autoIncrement.plugin, { model: 'Prescription', startAt: 1000 });


module.exports = mongoose.model('Prescription', prescriptionSchema);
