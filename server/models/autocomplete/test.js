// models/autocomplete/test.js

var mongoose = require('mongoose');

testSchema = mongoose.Schema({
  name: String,
  units: String,
  cat: String
})

var schema = mongoose.Schema({
  val: {
    type: testSchema,
    required: true
  },
  freq: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('AC_Test', schema)
