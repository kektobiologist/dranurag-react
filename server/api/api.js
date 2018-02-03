var Visit = require("../models/visit");
var Patient = require("../models/patient");
var PicturePrescription = require("../models/picturePrescription");
var Prescription = require("../models/prescription");
var Invoice = require("../models/invoice");

var moment = require("moment");
var request = require("request-promise-native");
var fs = require("fs");
var ejs = require("ejs");
var dateformat = require("dateformat");
var stringjs = require("string");
const puppeteer = require("puppeteer");
var _ = require("lodash");
const restify = require("express-restify-mongoose");
const express = require("express");

// should really split this up into multiple files
module.exports = app => {
  // prescription template
  const prescriptionTemplate = ejs.compile(
    fs.readFileSync("server/public/prescription.ejs", "utf8")
  );
  // options for express-pdf
  const pdfOptions = {
    path: "prescription.pdf"
  };

  app.get("/api/randomVisits", (req, res) => {
    Visit.find()
      .populate("patient")
      .populate("patient.age")
      .exec()
      .then(visits => visits.filter(visit => visit.patient))
      .then(visits => {
        return visits.map(e => {
          console.log(e);
          helpText = e.patient.getHelpText();
          e = e.toObject();
          e.ago = moment(e.date).fromNow();
          e.helpText = helpText;
          return e;
        });
      })
      .then(docs => {
        res.json(docs);
      });
  });

  app.get("/api/visits", (req, res) => {
    var d = new Date();
    d.setHours(d.getHours() - 6);
    Visit.find({ date: { $gte: d } })
      .sort({ date: -1 })
      .populate("patient")
      .exec()
      // filter visits that have patient associated with them!
      .then(visits => visits.filter(visit => visit.patient))
      .then(visits => {
        return _.uniqBy(visits, e => e.patient._id);
      })
      .then(visits => {
        return visits.map(e => {
          helpText = e.patient.getHelpText();
          e = e.toObject();
          e.ago = moment(e.date).fromNow();
          e.helpText = helpText;
          return e;
        });
      })
      .then(visits => res.json(visits));
  });

  var getPatientPromise = id => Patient.findOne({ _id: parseInt(id) }).exec();

  var getScannedPrescriptionsPromise = id =>
    PicturePrescription.find({ patient: parseInt(id) })
      .sort({ timestamp: -1 })
      .exec();

  var getGeneratedPrescriptionsPromise = id =>
    Prescription.find({ patient: id })
      .sort({ date: -1 })
      .exec()
      .then(docs =>
        docs.map(doc => ({
          timestamp: doc.date,
          url: `/api/prescriptionPdf/${doc._id}`,
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

  var getPatientInvoicesPromise = id =>
    Invoice.find({ patient: id })
      .sort({ timestamp: -1 })
      .exec();

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

  app.get("/api/patient/:id", (req, res) => {
    const { id } = req.params;
    getPatientPromise(id).then(doc => {
      // setTimeout(() => res.json(doc), 1000);
      res.json(doc);
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
      Connection: "keep-alive",
      Cookie:
        'state=TELANGANA; intermediateWareHouse=; currentCity=HYDERABAD; warehouse=INAPHYD00384; currentHub=INTGHYD00467; pincode=500042; area=; versionNo=36243; localityId=8108; hlocality=BALA NAGAR; subLocality=; latLong=17.4603401,78.4529809; cartD=; cartProductIdString={}; isCityChanged=true; hub=INTGHYD00467; defaultLocality=N; ROUTEID=.jvm6; __stp={"visit":"new","uuid":"ef4265da-0d93-4655-85b2-f99bed564cad"}; __sts={"sid":1510987881076,"tx":1510988031387,"url":"https://www.medplusmart.com/product/BENADON-40MG-TABLET/BENA0004","pet":1510988031387,"set":1510987881076,"pUrl":"https://www.medplusmart.com/product/MGD3-TABLET/MGD30001","pPet":1510987881076,"pTx":1510987881076}; JSESSIONID=B912BC4AF2257CBCE024D9EE12292F68'
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

  app.get("/api/patientScannedPrescriptions/:id", (req, res) => {
    const { id } = req.params;
    getScannedPrescriptionsPromise(id).then(docs => {
      res.json(docs);
    });
  });

  app.use("/api/pdfFromHTMLString", function(req, res) {
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

  app.post("/api/previewPrescriptionPdf", (req, res) => {
    const prescription = req.body;
    const { patient } = prescription;
    // preview the prescription provided
    Patient.findOne({ _id: patient })
      .then(doc => renderHTML({ ...prescription, date: new Date() }, doc))
      .then(htmlString => getPdfBufferPuppeteer(htmlString))
      .then(buffer => res.send(buffer))
      .catch(err => console.log(err));
  });

  app.post("/api/submitPrescription", (req, res) => {
    // patient id is already fill in
    const prescription = req.body;
    new Prescription({ ...prescription, date: new Date() })
      .save()
      .then(doc => res.json(doc))
      .catch(err => {
        console.log(err);
        res.json("NOTOK");
      });
  });

  app.get("/api/prescriptionPdf/:id", (req, res) => {
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
  app.get("/api/prescription/:id", (req, res) => {
    const { id } = req.params;
    Prescription.findOne({ _id: id })
      .populate("patient")
      .exec()
      .then(prescription => renderHTML(prescription, prescription.patient))
      .then(htmlString => res.send(htmlString))
      .catch(err => {
        console.log(err);
        res.send("NOTOK");
      });
  });

  var getGeneratedPrescriptionsPromise = id =>
    Prescription.find({ patient: id })
      .sort({ date: -1 })
      .exec()
      .then(docs =>
        docs.map(doc => ({
          timestamp: doc.date,
          url: `/api/prescriptionPdf/${doc._id}`,
          title: moment(doc.date).format("MMMM Do, YYYY")
        }))
      );
  // prescriptions info only: url, timestamp, title
  app.get("/api/patientGeneratedPrescriptionsInfo/:patientId", (req, res) => {
    const { patientId } = req.params;
    getGeneratedPrescriptionsPromise(patientId).then(docs => res.json(docs));
  });

  app.get("/api/getLatestPrescriptionJSON/:patientId", (req, res) => {
    const { patientId } = req.params;
    getLatestPrescriptionPromise(patientId).then(doc => res.json(doc));
  });

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  function bmi(weightKg, heightCm) {
    if (!weightKg || !heightCm) return null;
    weightKg = parseInt(weightKg);
    heightCm = parseInt(heightCm);
    ret = parseFloat(weightKg / (heightCm / 100 * (heightCm / 100))).toFixed(2);
    console.log("bmi is " + ret);
    return ret;
  }

  app.post("/api/addPatient", (req, res) => {
    patient = req.body;
    const { height, weight, name, sex } = patient;
    patient = {
      ...patient,
      height: height ? Number(height) : height,
      weight: weight ? Number(weight) : weight,
      name: toTitleCase(name),
      timestamp: Date.now(),
      sex: sex ? sex : "Male"
    };
    patient.bmi = bmi(patient.weight, patient.height);
    if (patient.age)
      patient.inferredBirthdate = moment().subtract(
        Number(patient.age),
        "years"
      );
    new Patient(patient)
      .save()
      .then(patient => Visit.addVisit(Patient, Visit, patient.id))
      .then(visit => {
        res.json("OK");
      })
      .catch(err => {
        console.log(err);
        res.json("NOTOK");
      });
  });

  app.get("/api/deletePatient/:id", (req, res) => {
    // TODO: should probably also delete visits associated with this patient
    const { id } = req.params;
    Patient.findById(id)
      .then(doc => doc.remove())
      .then(res => console.log(res))
      .then(() => res.json("OK"))
      .catch(err => {
        console.log(err);
        res.json("NOTOK");
      });
  });

  app.get("/api/addVisit/:id", (req, res) => {
    const { id } = req.params;
    Visit.addVisit(Patient, Visit, id)
      .then(res.json("OK"))
      .catch(err => {
        console.log(err);
        res.json("NOTOK");
      });
  });

  app.post("/api/addPicturePrescription", function(req, res) {
    console.log("got an add picture request");
    new PicturePrescription({
      patient: parseInt(req.body.id),
      url: req.body.url,
      timestamp: moment.now(),
      title: moment().format("MMMM Do, YYYY")
    })
      .save()
      .then(() => res.json("OK"))
      .catch(e => res.json("NOTOK"));
  });

  // visit search by date
  app.post("/api/visitSearch", (req, res) => {
    day = new Date(req.body.visitDate);
    nextDay = moment(day)
      .add(1, "days")
      .toDate();
    Visit.find({
      date: {
        $gte: day,
        $lt: nextDay
      }
    })
      .sort({ date: -1 })
      .populate("patient")
      // filter visits that have patient associated with them!
      .then(visits => visits.filter(visit => visit.patient))
      .then(visits => {
        return _.uniqBy(visits, e => e.patient._id);
      })
      .then(visits => {
        return visits.map(e => {
          helpText = e.patient.getHelpText();
          e = e.toObject();
          e.ago = moment(e.date).fromNow();
          e.helpText = helpText;
          return e;
        });
      })
      .then(visits => {
        res.json(visits);
      })
      .catch(err => {
        console.log(err);
        res.json([]);
      });
  });

  const router = express.Router();
  // REST endpoints for editing patient
  restify.serve(router, Patient, {
    findOneAndUpdate: false,
    findOneAndRemove: false,
    lean: false
  });
  app.use(router);

  // Invoice endpoints
  app.post("/api/addInvoice", (req, res) => {
    const { patientId, amount } = req.body;
    new Invoice({
      patient: patientId,
      amount,
      timestamp: Date.now()
    })
      .save()
      .then(invoice => res.json(invoice))
      .catch(err => {
        console.log(err);
        res.json(null);
      });
  });

  app.get("/api/getPatientInvoices/:id", (req, res) => {
    const { id } = req.params;
    // don't populate patient
    getPatientInvoicesPromise(id)
      .then(invoices => res.json(invoices))
      .catch(err => {
        console.log(err);
        res.json([]);
      });
  });

  app.post("/api/getInvoicesWithinDates", (req, res) => {
    const { startDate, endDate } = req.body;
    // populate full patients, maybe not required...
    Invoice.find({ timestamp: { $gte: startDate, $lte: endDate } })
      .sort({ timestamp: 1 })
      .populate("patient")
      .exec()
      .then(invoices => res.json(invoices))
      .catch(err => {
        console.log(err);
        res.json([]);
      });
  });
};
