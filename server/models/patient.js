// models/patient.js
var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
var moment = require("moment");

// birthdate is inferred from age when patient is registered
var patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  inferredBirthdate: Date,
  sex: String,
  phone1: String,
  phone2: String,
  height: Number,
  weight: Number,
  bmi: Number,
  allergies: String,
  timestamp: Number
});

patientSchema.methods.getHelpText = function() {
  helpText = this.sex == "Male" ? "M" : "F";
  if (this.inferredBirthdate) {
    helpText += " / " + this.age + " yrs";
  }
  if (this.phone1) {
    helpText += " /  <i class='fa fa-phone px-1'></i> " + this.phone1;
  }
  return helpText;
};

patientSchema.virtual("age").get(function() {
  return moment(new Date()).diff(this.inferredBirthdate, "years");
});

patientSchema.virtual("age").set(age => {
  this.inferredBirthdate = moment()
    .subtract(age, "years")
    .toDate();
});

// add pre for findOneAndUpdate just to see if it fixes the age issue
// this is assuming the express-restify-mongoose uses findOneAndUpdate for PATCH
patientSchema.pre("findOneAndUpdate", function() {
  if (this._update.$set.age) {
    this._update.$set.inferredBirthdate = moment().subtract(
      this._update.$set.age,
      "years"
    );
  }
});

patientSchema.plugin(autoIncrement.plugin, { model: "Patient", startAt: 1000 });

module.exports = mongoose.model("Patient", patientSchema);
