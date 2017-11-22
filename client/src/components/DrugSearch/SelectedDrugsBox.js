import React, { Component } from "react";
import ReactDOM from "react-dom";

import { ListGroup, ListGroupItem } from "reactstrap";
import { Field, FieldArray, reduxForm } from "redux-form";

import SelectedDrugCard from "./SelectedDrugCard";

var DrugsForm = ({ selectedDrugs, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <ListGroup className="mt-2 col">
      {selectedDrugs.map(drug => (
        <ListGroupItem key={drug.idx}>
          <SelectedDrugCard key={drug.idx} drug={drug} />
        </ListGroupItem>
      ))}
    </ListGroup>
    <button type="submit">Submit</button>
  </form>
);

export default reduxForm({
  form: "drugsForm"
})(DrugsForm);
