import "babel-polyfill"; // bullshit
var path = require("path");
var configVars = require("dotenv").config({
  path: path.join(__dirname, "../../.env.test")
});
const app = require("../index");
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let Visit = require("../models/visit");
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

var testPatient1 = {
  name: "test patient",
  sex: "Male",
  height: "157",
  weight: "50",
  age: "29",
  phone1: 9717585207
};

var testPatient1Assertions = patientDocument => {
  patientDocument.should.have.property("name", "Test Patient");
  patientDocument.should.have.property("bmi", 20.28);
  patientDocument.should.have.property("date");
  patientDocument.should.have.property("inferredBirthdate");
  var birthday = moment().subtract(Number(patientDocument.age), "years");
  moment(patientDocument.inferredBirthdate)
    .startOf("day")
    .should.be.sameMoment(birthday.startOf("day"));
};

describe("Patient", () => {
  describe("Get Patient", () => {
    it("gets a patient", done => {
      new Patient(testPatient1).save().then(patient => {
        agent
          .get(`/api/patient/${patient._id}`)
          .then(res => {
            res.should.have.status(200);
            res.should.be.json;
            testPatient1Assertions(res.body);
            // do cleanup
            return patient;
          })
          .then(patient => Patient.findByIdAndRemove(patient._id))
          .then(deleted => done())
          .catch(err => done(err));
      });
    });

    it("gets non existing patient", done => {
      agent
        .get("/api/patient/12312")
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          should.not.exist(res.body);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe("Add Patient", () => {
    it("adds a patient", done => {
      agent
        .post("/api/patient/add")
        .send(testPatient1)
        .then(res => {
          res.should.have.status(200);
          // returned obj is visit
          res.should.be.json;
          res.body.should.have.property("date");
          moment(res.body.date)
            .startOf("day")
            .should.be.sameMoment(moment().startOf("day"));
          res.body.should.have.property("patient");
          return res.body.patient;
        })
        .then(patientId => Patient.findOne({ _id: patientId }))
        // added patient checks
        .then(patientDocument => {
          testPatient1Assertions(patientDocument);
          return patientDocument._id;
        })
        // cleanup
        .then(patientId => Patient.findByIdAndRemove(patientId))
        .then(doc => done())
        .catch(err => done(err));
    });
  });

  describe("Delete Patient", () => {
    it("deletes an existing patient", done => {
      new Patient(testPatient1)
        .save()
        .then(patientDocument =>
          agent.get(`/api/patient/delete/${patientDocument._id}`)
        )
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          testPatient1Assertions(res.body);
          res.body.should.have.property("_id");
          return res.body._id;
        })
        .then(_id =>
          // make sure patient is deleted
          Patient.findOne({ _id })
        )
        .then(doc => should.not.exist(doc))
        .then(() => done())
        .catch(err => done(err));
    });

    it("deletes a non-existing patient", done => {
      agent
        .get("/api/patient/delete/323424")
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          should.not.exist(res.body);
          done();
        })
        .catch(err => done(err));
    });
  });
});
