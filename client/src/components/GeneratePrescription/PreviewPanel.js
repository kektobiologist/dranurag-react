import React, { Component } from "react";
import { connect } from "react-redux";
import { formName } from "../../config/config";
import DrugPreviewCard from "./DrugPreviewCard";
import { ListGroup, ListGroupItem } from "reactstrap";
import { formValueSelector } from "redux-form"; // ES6

// show the drugs/tests/advice preview

var PreviewPanel = ({ drugs }) => {
  if (!drugs) return <div />;
  return (
    <ListGroup>
      {drugs.map((drug, idx) => (
        <ListGroupItem key={idx}>
          <DrugPreviewCard drug={drug} />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

const selector = formValueSelector(formName);

PreviewPanel = connect(state => ({
  drugs: selector(state, "selectedDrugs")
}))(PreviewPanel);

export default PreviewPanel;
