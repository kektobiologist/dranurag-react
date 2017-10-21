// models/patient.js
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var moment = require('moment');

var patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  sex: String,
  phone1: String,
  phone2: String,
  height: Number,
  weight: Number,
  bmi   : Number,
  allergies: String,
  timestamp: Number,
});

patientSchema.methods.getHelpText = function() {
  // <i class="fa fa-transgender px-2"></i> / <i class="fa fa-phone px-1"></i> +917407650530 / 24 yrs
  // helpText = "<i class='fa fa-" + (this.sex == "Male" ? "mars" : "venus" ) + " pr-2'></i>"
  helpText = this.sex == "Male" ? "M" : "F" 
  if (this.age) {
    helpText += " / " + this.getAge() + " yrs"
  }
  if (this.phone1) {
    helpText += " /  <i class='fa fa-phone px-1'></i> " + this.phone1
  }
  return helpText
}


patientSchema.methods.getAge = function() {
  return String(this.age)
  // return moment(new Date()).diff(this.dateOfBirth, 'years')
}

patientSchema.plugin(autoIncrement.plugin, { model: 'Patient', startAt: 1000 });


module.exports = mongoose.model('Patient', patientSchema);
