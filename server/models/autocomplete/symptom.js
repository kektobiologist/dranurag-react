// models/autocomplete/symptom.js

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

module.exports = mongoose.model('AC_Symptom', schema)
