var express = require("express");
var router = express.Router();

var dateformat = require("dateformat");
var PicturePrescription = require("../models/picturePrescription");
var Prescription = require("../models/prescription");
var Patient = require("../models/patient");
var ejs = require("ejs");
var fs = require("fs");
var stringjs = require("string");

var moment = require("moment");
var path = require("path");
import _ from "lodash";
const puppeteer = require("puppeteer");

// prescription template
const prescriptionTemplate = ejs.compile(
  fs.readFileSync("server/public/prescription.ejs", "utf8")
);
// options for express-pdf
const pdfOptions = {
  path: "prescription.pdf"
};

var getScannedPrescriptionsPromise = id =>
  PicturePrescription.find({ patient: parseInt(id) })
    .sort({ date: -1 })
    .exec();

var getGeneratedPrescriptionsPromise = id =>
  Prescription.find({ patient: id })
    .sort({ date: -1 })
    .exec()
    .then(docs =>
      docs.map(doc => ({
        date: doc.date,
        url: `/api/prescription/generated/pdf/${doc._id}`,
        title: moment(doc.date).format("MMMM Do, YYYY")
      }))
    );

var getLatestPrescriptionPromise = id =>
  Prescription.find({ patient: id })
    .sort({ date: -1 })
    .limit(1)
    .exec()
    .then(docs => {
      if (docs.length) return docs[0];
      else return null;
    });

router.get("/scanned/patient/:id", (req, res) => {
  const { id } = req.params;
  getScannedPrescriptionsPromise(id).then(docs => {
    res.json(docs);
  });
});

router.use("/pdfFromHTMLString", function(req, res) {
  res.pdfFromHTML({
    filename: "generated.pdf",
    htmlContent: "<html><body>ASDF</body></html>",
    options: {}
  });
});

var renderHTML = (prescription, patient) => {
  return prescriptionTemplate({
    patient: patient,
    prescription: prescription,
    dateformat: dateformat,
    stringjs: stringjs
  });
};
const { performance } = require("perf_hooks");

var getPdfBufferPuppeteer = async htmlString => {
  // TODO: use a global instance instead of making one every time?
  // no-sandbox required for heroku; might need ['--no-sandbox', '--disable-setuid-sandbox'] if this doenst work

  performance.mark("Start");
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  performance.mark("Browser Opened");
  performance.measure("Browser time", "Start", "Browser Opened");
  const page = await browser.newPage();
  performance.mark("Page Opened");
  performance.measure("Page open time", "Browser Opened", "Page Opened");
  await page.goto(`data:text/html,${htmlString}`, {
    waitUntil: "networkidle0"
  });
  performance.mark("Page Rendered");
  performance.measure("Page rendering", "Page Opened", "Page Rendered");
  await page.emulateMedia("screen");
  var pdfPromise = await page.pdf({
    format: "A4",
    margin: {
      top: "0px",
      bottom: "0px",
      left: "0px",
      right: "0px"
    },
    pageRanges: "1"
  });

  performance.mark("PDF Rendered");
  performance.measure("PDF Rendering", "Page Rendered", "PDF Rendered");
  performance.clearMarks();
  console.log(performance.getEntries());
  performance.clearMeasures();
  await browser.close();
  return pdfPromise;
};

router.post("/generated/previewPdf", (req, res) => {
  const prescription = req.body;
  const { patient } = prescription;
  // preview the prescription provided
  Patient.findOne({ _id: patient })
    .then(doc => renderHTML({ ...prescription, date: new Date() }, doc))
    .then(htmlString => getPdfBufferPuppeteer(htmlString))
    .then(buffer => res.send(buffer))
    .catch(err => console.log(err));
});

router.post("/generated/submit", async (req, res, next) => {
  // patient id is already fill in
  try {
    if (!req.body.patient) {
      res.status(400).send("patient is required.");
      return;
    }
    var patient = await Patient.findOne({ _id: req.body.patient });
    if (!patient) {
      res.status(400).send("patient doesn't exist");
      return;
    }
    var prescription = await new Prescription(req.body).save();
    res.json(prescription);
  } catch (err) {
    next(err);
  }
});

router.get("/generated/pdf/:id", (req, res) => {
  const { id } = req.params;
  Prescription.findOne({ _id: id })
    .populate("patient")
    .exec()
    .then(prescription => renderHTML(prescription, prescription.patient))
    .then(htmlString => getPdfBufferPuppeteer(htmlString))
    .then(buffer => {
      res.setHeader(
        "Content-disposition",
        'inline; filename="prescription.pdf"'
      );
      res.setHeader("Content-type", "application/pdf");
      res.send(buffer);
    })
    .catch(err => {
      console.log(err);
      res.send("NOTOK");
    });
});

// prescription as html
router.get("/generated/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    var prescription = await Prescription.findOne({ _id: parseInt(id) })
      .populate("patient")
      .exec();
    if (!prescription) res.status(400).json(null);
    else {
      var rendered = renderHTML(prescription, prescription.patient);
      res.send(rendered);
    }
  } catch (err) {
    next(err);
  }
});

// prescriptions info only: url, date, title
router.get("/generated/info/:patientId", (req, res) => {
  const { patientId } = req.params;
  getGeneratedPrescriptionsPromise(patientId).then(docs => res.json(docs));
});

router.get("/generated/latest/:patientId", (req, res) => {
  const { patientId } = req.params;
  getLatestPrescriptionPromise(patientId).then(doc => res.json(doc));
});

router.post("/scanned/submit", async function(req, res, next) {
  try {
    let patient = await Patient.findOne({ _id: req.body.patient });
    if (!patient) {
      res.status(400).json(null);
      return;
    }
    let prescription = await PicturePrescription({ ...req.body }).save();
    res.json(prescription);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
  getGeneratedPrescriptionsPromise,
  getLatestPrescriptionPromise,
  getScannedPrescriptionsPromise
};
