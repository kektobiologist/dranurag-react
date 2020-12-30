import 'idempotent-babel-polyfill'; // bullshit
var path = require("path");
var configVars = require("dotenv").config({
  path: path.join(__dirname, "../../.env.test")
});
const app = require("../index");
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let Prescription = require("../models/prescription");
let PicturePrescription = require("../models/picturePrescription");
let Patient = require("../models/patient");

let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(require("chai-moment"));
chai.use(chaiHttp);

var agent = chai.request.agent(app);

import moment from "moment";

before(done => {
  agent
    .post("/api/login")
    .send({ username: "username", password: "password" })
    .end((err, res) => done());
});

var testScannedPrescription1 = {
  url:
    "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505226387/cjihbmsxlnl2culpvezp.jpg"
};

var testScannedPrescription1Assertions = doc => {
  doc.should.have.property(
    "url",
    "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505226387/cjihbmsxlnl2culpvezp.jpg"
  );
  doc.should.have.property("patient");
  doc.should.have.property("title");
  doc.should.have.property("date");
  doc.title.should.equal(moment(doc.date).format("MMMM Do, YYYY"));
};

describe("Scanned Prescription", () => {
  describe("Get Scanned Prescriptions For Patient", () => {
    it("get prescriptions for existing patient", async () => {
      var patient = await new Patient({ name: "dummy patient" }).save();
      var scannedPrescription1 = await new PicturePrescription({
        ...testScannedPrescription1,
        patient: patient._id
      }).save();
      var scannedPrescription2 = await new PicturePrescription({
        ...testScannedPrescription1,
        patient: patient._id
      }).save();
      var res = await agent.get(
        `/api/prescription/scanned/patient/${patient._id}`
      );
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.lengthOf(2);
      testScannedPrescription1Assertions(res.body[0]);
      testScannedPrescription1Assertions(res.body[1]);
      // cleanup
      await Promise.all([
        patient.remove(),
        scannedPrescription2.remove(),
        scannedPrescription1.remove()
      ]);
    });

    it("get prescriptions for non existing patient", async () => {
      var res = await agent.get(`/api/prescription/scanned/patient/2342343`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.lengthOf(0);
    });
  });

  describe("Add Scanned Prescription", () => {
    it("adds a prescription for existing patient", async () => {
      var patient = await new Patient({ name: "dummy patient" }).save();
      var res = await agent
        .post(`/api/prescription/scanned/submit`)
        .send({ patient: patient._id, url: "dummy url" });
      res.should.have.status(200);
      res.should.be.json;
      // we'll check the database here, not response
      var addedPrescription = await PicturePrescription.findOne({
        _id: res.body._id
      });
      addedPrescription.should.have.property("patient", patient._id);
      addedPrescription.should.have.property("url", "dummy url");
      addedPrescription.should.have.property("title");
      // cleanup
      await Promise.all([patient.remove(), addedPrescription.remove()]);
    });

    it("adds a prescription for non existing patient", async () => {
      try {
        var err,
          res = await agent
            .post(`/api/prescription/scanned/submit`)
            .send({ patient: 23424234, url: "dummy url" });
        assert(false);
      } catch (err) {
        err.response.status.should.be.eql(400);
      }
    });
  });
});

describe("Generated Prescription", () => {
  describe("Get Generated Prescription HTML", () => {
    it("get an existing prescription", async () => {
      var patient = await new Patient({ name: "dummy patient" }).save();
      var generated = await new Prescription({ patient: patient._id }).save();
      var res = await agent.get(`/api/prescription/generated/${generated._id}`);
      // res is the html for the prescription
      res.should.have.status(200);
      res.should.be.html;
      // cleanup
      await Promise.all([patient.remove(), generated.remove()]);
    });

    it("get non existing patient", async () => {
      try {
        var res = await agent.get(`/api/prescription/generated/23242343`);
        assert(false);
      } catch (err) {
        err.response.status.should.be.eql(400);
      }
    });
  });

  describe("Add a Generated Prescription", () => {
    it("add prescription for exisitng patient", async () => {
      var patient = await new Patient({ name: "dummy patient" }).save();
      var res = await agent
        .post(`/api/prescription/generated/submit`)
        .send({ patient: patient._id });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property("date");
      res.body.should.have.property("patient");
      // cleanup
      await Promise.all([
        patient.remove(),
        Prescription.findByIdAndRemove(res.body._id)
      ]);
    });

    it("add prescription for non existing patient", async () => {
      try {
        var res = await agent
          .post(`/api/prescription/generated/submit`)
          .send({ patient: 234234 });
      } catch (err) {
        err.response.status.should.be.eql(400);
      }
    });

    it("add prescription without patient", async () => {
      try {
        var res = await agent
          .post(`/api/prescription/generated/submit`)
          .send({});
      } catch (err) {
        err.response.status.should.be.eql(400);
      }
    });
  });
});

// TIRED OF TESTS, might write some later for this....
