var Visit = require("../models/visit");
var Patient = require("../models/patient");
var PicturePrescription = require("../models/picturePrescription");
var Prescription = require("../models/prescription");
var Invoice = require("../models/invoice");

var moment = require("moment");
var request = require("request-promise-native");
var _ = require("lodash");
const restify = require("express-restify-mongoose");
const express = require("express");

// routers
import { router as invoiceRouter, getPatientInvoicesPromise } from "./invoice";
import { router as visitRouter } from "./visit";
import { router as patientRouter, getPatientPromise } from "./patient";
import {
  router as prescriptionRouter,
  getScannedPrescriptionsPromise,
  getGeneratedPrescriptionsPromise,
  getLatestPrescriptionPromise
} from "./prescription";
// should really split this up into multiple files
module.exports = app => {
  app.get("/api/patientData/:id", (req, res) => {
    const { id } = req.params;
    Promise.all([
      getPatientPromise(id),
      getScannedPrescriptionsPromise(id),
      getGeneratedPrescriptionsPromise(id),
      getLatestPrescriptionPromise(id),
      getPatientInvoicesPromise(id)
    ])
      .then(
        (
          [
            patient,
            scannedPrescriptions,
            generatedPrescriptions,
            latestPrescription,
            invoices
          ]
        ) => {
          res.json({
            patientId: parseInt(id), // id seems to be reserved keyword in react?
            patient,
            scannedPrescriptions,
            generatedPrescriptions,
            latestPrescription,
            invoices
          });
        }
      )
      .catch(err => {
        console.log(err);
        res.json({});
      });
  });

  app.get("/api/medplusmart/drugs", (req, res) => {
    const { q } = req.query;
    var headers = {
      Pragma: "no-cache",
      "Accept-Encoding": "text/json",
      "Accept-Language": "en-US,hi-IN;q=0.8,hi;q=0.6,en;q=0.4",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.78 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    };

    var options = {
      url:
        "https://www.medplusmart.com/ProductSearchAll.mart?n=" +
        new Buffer(q).toString("base64") +
        "&productType=P",
      headers: headers
    };

    return request
      .get(options)
      .then(htmlString => {
        // console.log(htmlString);
        products = JSON.parse(htmlString);
        res.json({
          drugs: products.map(drug => {
            return {
              name: drug["productName"],
              composition: drug.compositionName.split("+"),
              id: drug["id"]
            };
          })
        });
      })
      .catch(err => {
        res.json({
          drugs: []
        });
      });
  });

  const patientRESTRouter = express.Router();
  // REST endpoints for editing patient
  restify.serve(patientRESTRouter, Patient, {
    findOneAndUpdate: false,
    findOneAndRemove: false,
    lean: false
  });
  app.use(patientRESTRouter);

  // Patient endpoints
  app.use("/api/patient", patientRouter);
  // Visit endpoints
  app.use("/api/visit", visitRouter);
  // Invoice endpoints
  app.use("/api/invoice", invoiceRouter);
  // Prescription and PicturePrescription endpoints
  app.use("/api/prescription", prescriptionRouter);

  // error handler
  // just use default?
  // app.use((err, req, res, next) => {
  //   console.error(err);
  //   res.status(500).send(err);
  // });
};
