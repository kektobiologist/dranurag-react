var mongoose = require("mongoose");
var connection = mongoose.connect(process.env.MONGODB_URI); // connect to our database

// use js promise
mongoose.Promise = global.Promise;
var moment = require("moment");

var Invoice = require("../models/invoice");
var Patient = require("../models/patient");

var setup = async () => {
  // get some random patients
  var patients = await Patient.find().limit(10);
  var startDate = moment(new Date("12-01-2017"));
  var endDate = moment(new Date("02-04-2018"));
  for (var m = moment(startDate); m.isBefore(endDate); m.add(1, "days")) {
    // number of invoices b/w 0-6
    var numInvoices = Math.floor(Math.random() * 6);
    for (var i = 0; i < numInvoices; i += 1) {
      // get a random patient
      var patient = patients[Math.floor(Math.random() * 10)];
      await new Invoice({
        patient: patient._id,
        date: m.toDate(),
        amount: Math.random() > 0.5 ? 500 : 300
      }).save();
    }
  }
  console.log("done");
};

setup();
