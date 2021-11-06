// models/patient.js
var mongoose = require("mongoose");
import { autoIncrement } from "mongoose-plugin-autoinc";
var moment = require("moment");
var algoliaHooksWrapper = require("./util/algoliaHooksWrapper");
var emailValidator = require("email-validator");



// birthdate is inferred from age when patient is registered
var patientSchema = mongoose.Schema(
  {
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
    allergies: String,
    date: Date,
    email: { type: String, default: "" }
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

patientSchema
  .virtual("age")
  .get(function() {
    return moment().diff(this.inferredBirthdate, "years");
  })
  // using '=>' style functions changed 'this' var?
  .set(function(age) {
    this.set(
      "inferredBirthdate",
      moment()
        .subtract(age, "years")
        .toDate()
    );
  });

function bmi(weightKg, heightCm) {
  if (!weightKg || !heightCm) return null;
  weightKg = parseInt(weightKg);
  heightCm = parseInt(heightCm);
  return Number(
    parseFloat(weightKg / (heightCm / 100 * (heightCm / 100))).toFixed(2)
  );
}

// no setter for bmi
patientSchema.virtual("bmi").get(function() {
  return bmi(this.weight, this.height);
});

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// pre hooks for save
patientSchema.pre("save", function(next) {
  this.name = toTitleCase(this.name);
  this.sex =
    this.sex == "Male" ? this.sex : this.sex == "Female" ? this.sex : "Male";
  // add date here. it's the time of last update i guess? no idea
  this.date = new Date();
  next();
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

patientSchema.path('email').validate(function (email) {
  // empty address is valid in our case
  if (email === "")
    return true;
  return emailValidator.validate(email);
}, 'Malformed email address.')

// algolia hooks
algoliaHooksWrapper(patientSchema, "patients");

patientSchema.plugin(autoIncrement, { model: "Patient", startAt: 1000 });

module.exports = mongoose.model("Patient", patientSchema);
