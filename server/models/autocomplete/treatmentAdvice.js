// models/autocomplete/treatmentAdvice.js
// one model for each dietary, other

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
  Dietary: mongoose.model('AC_TreatmentAdviceDietary', schema),
  Other: mongoose.model('AC_TreatmentAdviceOther', schema),
}