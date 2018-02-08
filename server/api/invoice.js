var express = require("express");
var router = express.Router();

var Invoice = require("../models/invoice");
var Patient = require("../models/patient");

var moment = require("moment");
var pdfMake = require("pdfmake");
const PdfPrinter = require("pdfmake/src/printer");
var path = require("path");

var invoiceTemplateMaker = require("../scripts/pdfmake-invoice-template");

router.post("/add", (req, res) => {
  const { patientId, amount } = req.body;
  new Invoice({
    patient: patientId,
    amount,
    date: new Date()
  })
    .save()
    .then(invoice => res.json(invoice))
    .catch(err => {
      console.log(err);
      res.json(null);
    });
});

router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  Invoice.findByIdAndRemove(id)
    .exec()
    .then(() => res.json("OK"));
});

var getPatientInvoicesPromise = id =>
  Invoice.find({ patient: id })
    .sort({ date: -1 })
    .exec();

router.get("/patient/:id", (req, res) => {
  const { id } = req.params;
  // don't populate patient
  getPatientInvoicesPromise(id)
    .then(invoices => res.json(invoices))
    .catch(err => {
      console.log(err);
      res.json([]);
    });
});

// inputs are dates with time, output is exclusive of endDate
var getInvoicesWithinDatesPromise = (startDate, endDate) =>
  Invoice.find({
    date: { $gte: new Date(startDate), $lt: new Date(endDate) }
  })
    .sort({ date: 1 })
    .populate("patient")
    .exec();

// generic endpoint to just get all invoices, unformatted
router.post("/withinDates", (req, res) => {
  const { startDate, endDate } = req.body;
  // populate full patients, maybe not required...
  getInvoicesWithinDatesPromise(startDate, endDate)
    .then(invoices => res.json(invoices))
    .catch(err => {
      console.log(err);
      res.json([]);
    });
});

var groupArray = require("group-array");
// will return minimal, formatted stuff to render calendar heatmap and daywise patient list
router.post("/heatmapData", (req, res) => {
  const { startDate, endDate } = req.body;
  getInvoicesWithinDatesPromise(startDate, endDate)
    // remove invoices that don't have patient associated!
    // should probably just do cleanup on patient removal...
    .then(invoices => invoices.filter(invoice => invoice.patient))
    // remove unimportant patient data
    .then(invoices =>
      invoices.map(invoice => {
        const { _id, name } = invoice.patient;
        invoice.patient = { _id, name };
        return invoice;
      })
    )
    .then(invoices => {
      // init object with all dates
      var table = {};
      var startDate_ = moment(new Date(startDate));
      var endDate_ = moment(new Date(endDate));
      for (var m = startDate_; m.isBefore(endDate_); m.add(1, "days")) {
        table[m.format("YYYY-MM-DD")] = {
          amount: 0, // total money
          invoices: []
        };
      }
      // group them by dateString
      var grouped = groupArray(invoices, "dateString");
      Object.entries(grouped).forEach(([date, invoices]) => {
        table[date] = {
          amount: invoices.reduce((acc, invoice) => acc + invoice.amount, 0),
          invoices: invoices
        };
      });
      // turn {key: val} to [{date: key, ...val}]
      var ret = Object.entries(table).map(([date, obj]) => ({
        date: date,
        ...obj
      }));
      res.json(ret);
    });
});

const fontDescriptors = {
  Roboto: {
    normal: path.join(__dirname, "../public/fonts/Roboto-Regular.ttf"),
    bold: path.join(__dirname, "../public/fonts/Roboto-Bold.ttf"),
    italics: path.join(__dirname, "../public/fonts/Roboto-Italic.ttf"),
    bolditalics: path.join(__dirname, "../public/fonts/Roboto-MediumItalic.ttf")
  }
};
// invoice pdf generation
router.get("/pdf/:id", (req, res) => {
  const { id } = req.params;
  Invoice.findById(id)
    .populate("patient")
    .then(invoice => {
      if (!invoice) throw "no doc";
      return invoice;
    })
    .then(({ _id, patient, date, amount }) => {
      var pdfDefinition = invoiceTemplateMaker({
        invoiceId: _id,
        patientId: patient._id,
        date: moment(date),
        name: patient.name,
        fees: amount.toString()
      });
      const printer = new PdfPrinter(fontDescriptors);
      const pdfDoc = printer.createPdfKitDocument(pdfDefinition);
      res.type("pdf");
      pdfDoc.pipe(res).on("finish", function() {
        // console.log("pdf success");
      });
      pdfDoc.end();
    })
    .catch(err => {
      if (err == "no doc") res.json(err);
      else {
        console.log(err);
        res.json(err);
      }
    });
});

module.exports = {
  router,
  getPatientInvoicesPromise
};
