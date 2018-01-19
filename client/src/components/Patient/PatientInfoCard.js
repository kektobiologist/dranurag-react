import React from "react";
import { Row, Col } from "reactstrap";
import HelpText from "../util/HelpText";
import Editable from "../util/popover-editable/Editable";

var AttrRow = ({ keyName, val, units }) => {
  return (
    <Row className="py-2">
      <Col xs="4">{keyName}: </Col>
      <Col xs="3">{val}</Col>
      {units ? <Col xs="3">{units}</Col> : ""}
    </Row>
  );
};

// card containing detailed patient info (height weight etc.)
// used in Patient and GeneratePrescription pages
export default ({ patient, children }) => {
  const { height, weight, allergies, phone2 } = patient;
  var heightM = height / 100; // m
  var bmi = height ? (weight / (heightM * heightM)).toFixed(2) : "-";
  return (
    <Row>
      <Col
        xs="12"
        lg="6"
        className="d-flex flex-column justify-content-between"
      >
        <div>
          <Editable
            initialValue={patient.name}
            fieldName="name"
            display={value => <h1 className="display-3">{value}</h1>}
            endpoint={`/api/v1/Patient/${patient._id}`}
          />
          <HelpText patient={patient} />
          <div>ID: {patient._id}</div>
        </div>
        <div>{children}</div>
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
