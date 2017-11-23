import React, { Component } from "react";
import ReactDOM from "react-dom";

import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import {
  Field,
  FieldArray,
  reduxForm,
  formValues,
  formValueSelector
} from "redux-form";

import SelectedDrugCard from "./SelectedDrugCard";
import { formName } from "../../config/config";

var renderSelectedDrugs = ({ fields, selectedDrugs }) => {
  return (
    <ListGroup className="mt-2 col">
      <ListGroupItem>
        <button
          className="btn"
          onClick={e => {
            e.preventDefault();
            return fields.push({
              name: "dummy",
              drugMeta: {
                composition: ["somehthing"],
                frequencies: [{ val: "od", count: "2" }],
                dosages: [],
                durations: [],
                specialComments: []
              }
            });
          }}
        >
          Add Drug
        </button>
      </ListGroupItem>
      {fields.map((name, idx, fields) => {
        return (
          <ListGroupItem key={idx}>
            <SelectedDrugCard
              drug={name}
              drugMeta={selectedDrugs[idx].drugMeta}
            />
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

renderSelectedDrugs = formValues("selectedDrugs")(renderSelectedDrugs);

var DrugsForm = ({ handleSubmit, ...props }) => (
  <form onSubmit={handleSubmit}>
    <FieldArray
      name="selectedDrugs"
      component={renderSelectedDrugs}
      props={props}
    />
    <button type="submit">Submit</button>
  </form>
);

DrugsForm = reduxForm({
  form: formName
})(DrugsForm);

export default DrugsForm;
