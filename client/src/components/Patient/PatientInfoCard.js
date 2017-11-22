import React from "react";
import { Row, Col } from "reactstrap";
import HelpText from "../util/HelpText";

var AttrRow = ({ keyName, val, units }) => {
  return (
    <Row className="py-2">
      <Col xs="4">{keyName}: </Col>
      <Col xs="3">{val}</Col>
      {units ? <Col xs="3">{units}</Col> : ""}
    </Row>
  );
};

export default ({ patient }) => {
  const { height, weight, allergies, phone2 } = patient;
  var heightM = height / 100; // m
  var bmi = height ? (weight / (heightM * heightM)).toFixed(2) : "-";
  return (
    <Row>
      <Col xs="12" lg="6">
        <h1 className="display-3">{patient.name}</h1>
        <HelpText patient={patient} />
        <div>ID: {patient._id}</div>
      </Col>

      <Col xs="12" lg="6" className="py-2">
        {[
          ["Height", height ? height : "-", "cms"],
          ["Weight", weight ? weight : "-", "kgs"],
          ["BMI", bmi, null],
          ["Allergies", allergies ? allergies : "-", null],
          ["Alternate Phone", phone2 ? phone2 : "-", null]
        ].map(([keyName, val, units], idx) => (
          <AttrRow key={idx} keyName={keyName} val={val} units={units} />
        ))}
      </Col>
    </Row>
  );
};
