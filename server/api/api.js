var Visit = require("../models/visit");
var Patient = require("../models/patient");
var PicturePrescription = require("../models/picturePrescription");
var Prescription = require("../models/prescription");

var moment = require("moment");
var request = require("request-promise-native");
var fs = require("fs");
var ejs = require("ejs");
var dateformat = require("dateformat");
var stringjs = require("string");
const puppeteer = require("puppeteer");

module.exports = app => {
  // prescription template
  const prescriptionTemplate = ejs.compile(
    fs.readFileSync("server/public/prescription.ejs", "utf8")
  );
  // options for express-pdf
  const pdfOptions = {
    path: "prescription.pdf"
  };

  app.get("/api/visits", (req, res) => {
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
        // setTimeout(() => res.json(docs), 2000);
        res.json(docs);
      });
  });

  app.get("/api/patient/:id", (req, res) => {
    const { id } = req.params;
    Patient.findOne({ _id: parseInt(id) })
      .exec()
      .then(doc => {
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

  app.get("/api/patientPrescriptions/:id", (req, res) => {
    const { id } = req.params;
    PicturePrescription.find({ patient: parseInt(id) })
      .sort({ timestamp: -1 })
      .exec()
      .then(docs => {
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

  // app.post("/api/previewPrescriptionPdf", (req, res) => {
  //   console.log("got prescripti reequst");
  //   const prescription = req.body;
  //   const { patient } = prescription;
  //   // preview the prescription provided
  //   Patient.findOne({ _id: patient })
  //     .then(doc => renderHTML({ ...prescription, date: new Date() }, doc))
  //     .then(htmlString => {
  //       return res.pdfFromHTML({ ...pdfOptions, htmlContent: htmlString });
  //     })
  //     .catch(err => console.log(err));
  // });

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

  // app.get("/api/prescriptionPdf/:id", (req, res) => {
  //   const { id } = req.params;
  //   Prescription.findOne({ _id: id })
  //     .populate("patient")
  //     .exec()
  //     .then(prescription => renderHTML(prescription, prescription.patient))
  //     .then(htmlString =>
  //       res.pdfFromHTML({ ...pdfOptions, htmlContent: htmlString })
  //     )
  //     .catch(err => {
  //       console.log(err);
  //       res.send("NOTOK");
  //     });
  // });

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
  // app.get("/api/prescriptionPdf/:id", (req, res) => {
  //   const { id } = req.params;
  //   Prescription.findOne({ _id: id })
  //     .then(doc => renderHTML(doc))
  //     .then(htmlString => {
  //       res.pdfFromHTML();
  //     })
  //     .catch(err => res.json(err));
  // });

  // app.post("/api/submitPrescription/:patientId", (req, res) => {
  //   const { patientId } = req.params;
  //   const prescription = req.body;
  //   // just save prescription; don't return pdf yet!
  //   new Prescription({ ...prescription, date: new Date() })
  //     .save()
  //     .then(doc => {
  //       // just return document
  //       res.json(doc);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.json("NOTOK");
  //     });
  // });
};
