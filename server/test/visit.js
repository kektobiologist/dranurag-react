import 'idempotent-babel-polyfill'; // bullshit
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

describe("Visit", () => {
  describe("Add Visit", () => {
    it("adds a visit for existing patient", done => {
      var before = moment();
      agent
        .get("/api/visit/add/1005")
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property("_id");
          res.body.should.have.property("patient").with.valueOf(1005);
          var after = moment();
          res.body.should.have.property("date").that.is.beforeMoment(after);
          res.body.should.have.property("date").that.is.afterMoment(before);
          // delete this visit
          Visit.findByIdAndRemove(res.body._id).then(() => done());
        })
        .catch(err => done(err));
    });

    it("adds a visit for non existing patient", done => {
      agent.get("/api/visit/add/1002340").end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });

  describe("Today's Visits", () => {
    it("gets today's visits", done => {
      // add some visits
      var visitPromises = [
        Visit.addVisit(Patient, Visit, 1100),
        Visit.addVisit(Patient, Visit, 1100),
        Visit.addVisit(Patient, Visit, 1128)
      ];
      Promise.all(visitPromises).then(visits => {
        agent
          .get("/api/visit/today")
          .then(res => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.lengthOf(2);
            res.body.forEach(visit => {
              visit.date.should.be.beforeMoment(moment().endOf("day"));
              visit.date.should.be.afterMoment(moment().startOf("day"));
            });
            // clean up db
            var deletePromises = visits.map(visit =>
              Visit.findByIdAndRemove(visit._id)
            );
            return Promise.all(deletePromises);
          })
          .then(deleted => done())
          .catch(err => done(err));
      });
    });
  });

  describe("Day's Visits", () => {
    it("gets a days visits", done => {
      var date = "2018-01-19";
      agent
        .post("/api/visit/")
        .send({ date })
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.forEach(visit => {
            visit.date.should.be.beforeMoment(moment(date).endOf("day"));
            visit.date.should.be.afterMoment(moment(date).startOf("day"));
          });
          done();
        })
        .catch(err => done(err));
    });
  });
});
