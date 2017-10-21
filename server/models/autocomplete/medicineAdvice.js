// models/autocomplete/medicineAdvice.js
// one model for each frequency, duration, specialAdvice

var mongoose = require('mongoose');

var schema = mongoose.Schema({
  val: {
    type: String,
    required: true
  },
  freq: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = {
  Drug: mongoose.model('AC_MedicineAdviceDrug', schema),
  Duration: mongoose.model('AC_MedicineAdviceDuration', schema),
  Frequency: mongoose.model('AC_MedicineAdviceFrequency', schema),
  SpecialAdvice: mongoose.model('AC_MedicineAdviceSpecialAdvice', schema),
}