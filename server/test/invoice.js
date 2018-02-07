import "babel-polyfill"; // bullshit
var path = require("path");
var configVars = require("dotenv").config({
  path: path.join(__dirname, "../../.env.test")
});
const app = require("../index");
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let Invoice = require("../models/invoice");

// required for binary data with superagent/chai-http
// https://github.com/chaijs/chai-http/issues/141
var binaryParser = require("superagent-binary-parser");

let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

var agent = chai.request.agent(app);

import moment from "moment";

before(done => {
  agent
    .post("/api/login")
    .send({ username: "arpit", password: "pavilion" })
    .end((err, res) => done());
});

describe("Invoice", () => {
  describe("Add and Delete Invoice", () => {
    it("adds and deletes an invoice", done => {
      agent
        .post("/api/invoice/add")
        .send({ patientId: 1129, amount: 500 })
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property("patient").with.valueOf(1129);
          res.body.should.have.property("amount").with.valueOf(500);
          res.body.should.have
            .property("dateString")
            .with.valueOf(moment().format("YYYY-MM-DD"));
          // should remove this obj after we're done
          // done();
          return res.body._id;
        })
        .then(id => {
          agent.get(`/api/invoice/delete/${id}`).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.eql("OK");
            done();
          });
        })
        .catch(err => done(err));
    });
  });

  describe("Get Patient Invoices", () => {
    it("gets existing patient invoices", done => {
      var expected = [
        {
          _id: 1385,
          patient: 1129,
          amount: 500,
          date: "2018-02-05T17:41:00.773Z",
          __v: 0,
          dateString: "2018-02-05",
          id: "1385"
        },
        {
          _id: 1386,
          patient: 1129,
          amount: 500,
          date: "2018-02-05T17:47:43.336Z",
          __v: 0,
          dateString: "2018-02-05",
          id: "1386"
        },
        {
          _id: 1387,
          patient: 1129,
          amount: 500,
          date: "2018-02-05T17:54:11.746Z",
          __v: 0,
          dateString: "2018-02-05",
          id: "1387"
        },
        {
          _id: 1389,
          patient: 1129,
          amount: 500,
          date: "2018-02-06T05:30:11.757Z",
          __v: 0,
          dateString: "2018-02-06",
          id: "1389"
        }
      ];
      agent
        .get("/api/invoice/patient/1129")
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.eql(expected);
          done();
        })
        .catch(err => done(err));
    });

    it("gets non existing patient invoices", done => {
      agent.get("/api/invoice/patient/99999").then(res => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.eql([]);
        done();
      });
    });
  });

  describe("Get Invoices within dates", () => {
    it("gets some invoices", done => {
      agent
        .post("/api/invoice/withinDates")
        .send({
          startDate: "2017-11-30T18:30:00.000Z",
          endDate: "2017-12-01T18:30:00.000Z"
        })
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.lengthOf(3);
          // good enough
          done();
        })
        .catch(err => done(err));
    });
  });

  describe("Get Heatmap Data", () => {
    it("gets single day heatmap data", done => {
      var expected = [
        {
          date: "2017-12-01",
          amount: 1500,
          invoices: [
            {
              _id: 1205,
              patient: {
                _id: 1009,
                name: "Jamuna Das",
                age: 0,
                id: "1009",
                bmi: null
              },
              date: "2017-11-30T18:30:00.000Z",
              amount: 500,
              __v: 0,
              dateString: "2017-12-01",
              id: "1205"
            },
            {
              _id: 1206,
              patient: {
                _id: 1009,
                name: "Jamuna Das",
                age: 0,
                id: "1009",
                bmi: null
              },
              date: "2017-11-30T18:30:00.000Z",
              amount: 500,
              __v: 0,
              dateString: "2017-12-01",
              id: "1206"
            },
            {
              _id: 1207,
              patient: {
                _id: 1003,
                name: "Apoorv Umang",
                age: 0,
                bmi: null,
                id: "1003"
              },
              date: "2017-11-30T18:30:00.000Z",
              amount: 500,
              __v: 0,
              dateString: "2017-12-01",
              id: "1207"
            }
          ]
        }
      ];
      agent
        .post("/api/invoice/heatmapData")
        .send({
          startDate: "2017-11-30T18:30:00.000Z",
          endDate: "2017-12-01T18:30:00.000Z"
        })
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.eql(expected);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe("Get Invoice PDF", () => {
    it("get existing pdf", done => {
      agent
        .get("/api/invoice/pdf/1205")
        .parse(binaryParser)
        .buffer()
        .then(res => {
          res.should.have.status(200);
          res.should.have.header("content-type", "application/pdf");
          // can't really test pdf files since their binary form differs
          // in each call...
          done();
        })
        .catch(err => done(err));
    });

    it("get non existing pdf", done => {
      agent
        .get("/api/invoice/pdf/19999")
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.equal("no doc");
          done();
        })
        .catch(err => done(err));
    });
  });
});
