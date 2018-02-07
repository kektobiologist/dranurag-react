var express = require("express");
var router = express.Router();

var Patient = require("../models/patient");
var Visit = require("../models/visit");

var moment = require("moment");
var path = require("path");
import _ from "lodash";

var getPatientPromise = id => Patient.findOne({ _id: parseInt(id) }).exec();

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  getPatientPromise(id)
    .then(doc => res.json(doc))
    .catch(next);
});

router.post("/add", (req, res, next) => {
  var patient = req.body;
  new Patient(patient)
    .save()
    .then(patient => Visit.addVisit(Patient, Visit, patient.id))
    .then(visit => {
      res.json(visit);
    })
    .catch(next);
});

router.get("/delete/:id", (req, res, next) => {
  // TODO: should probably also delete visits associated with this patient
  // use find by id and then remove, so that algolia hook is called!
  const { id } = req.params;
  Patient.findOne({ _id: id })
    .then(doc => (doc ? doc.remove() : null))
    .then(doc => res.json(doc))
    .catch(next);
});

module.exports = {
  router,
  getPatientPromise
};
