var Visit = require("../models/visit");
var Patient = require("../models/patient");
var PicturePrescription = require("../models/picturePrescription");

var moment = require("moment");
var request = require("request-promise-native");

module.exports = app => {
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
};
