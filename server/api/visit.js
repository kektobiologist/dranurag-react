var express = require("express");
var router = express.Router();

var Visit = require("../models/visit");
var Patient = require("../models/patient");

var moment = require("moment");
var path = require("path");
import _ from "lodash";

router.get("/add/:id", (req, res, next) => {
  const { id } = req.params;
  Visit.addVisit(Patient, Visit, id)
    .then(visit => res.json(visit))
    .catch(err => {
      // probably patient doesn't exit
      res.status(400).send(err);
    });
});

var getVisitsOnDate = date => {
  return (
    Visit.find({
      date: {
        $gte: moment(date)
          .startOf("day")
          .toDate(),
        $lt: moment(date)
          .endOf("day")
          .toDate()
      }
    })
      .sort({ date: -1 })
      .populate("patient")
      .exec()
      // keep visits that have patient
      .then(visits => visits.filter(visit => visit.patient))
      // unique visits of a patient only
      .then(visits => _.uniqBy(visits, e => e.patient._id))
  );
};

// visit search by date
router.post("/", (req, res, next) => {
  getVisitsOnDate(req.body.date)
    .then(visits => res.json(visits))
    .catch(next);
});

// today's visits
router.get("/today", (req, res, next) => {
  getVisitsOnDate(new Date())
    .then(visits => res.json(visits))
    .catch(next);
});

module.exports = { router };
