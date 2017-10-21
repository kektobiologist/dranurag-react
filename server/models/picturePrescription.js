// models/picture_prescription.js
// load the things we need
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');


var schema = mongoose.Schema({
  patient: {type: Number, ref: 'Patient', required: true},
  url: String,
  timestamp: Number,
  title: String,
})

schema.plugin(autoIncrement.plugin, { model: 'PicturePrescription', startAt: 1000 });

module.exports = mongoose.model('PicturePrescription', schema)
