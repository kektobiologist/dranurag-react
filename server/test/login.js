import "babel-polyfill"; // bullshit
var path = require("path");
var configVars = require("dotenv").config({
  path: path.join(__dirname, "../../.env.test")
});

const app = require("../index");
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("Login", () => {
  var agent = chai.request.agent(app);
  it("should not be logged in", done => {
    agent.get("/api/checkLoggedIn").end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.eql(false);
      done();
    });
  });

  it("should log in", done => {
    agent
      .post("/api/login")
      .set("content-type", "application/json")
      .send({ username: "username", password: "password" })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.eql(true);
        done();
        // no fucking clue about cookies
        // agent.should.have.cookie("connect.sid");
      });
  });

  it("should log out", done => {
    agent.get("/api/logout").end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.eql(false);
      done();
    });
  });
});
