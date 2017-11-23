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
    <div>
      {fields.map((drug, idx) => {
        return (
          <ListGroupItem key={idx}>
            <SelectedDrugCard
              drug={drug}
              drugMeta={selectedDrugs[idx].drugMeta}
              onRemove={() => {
                fields.remove(idx);
              }}
            />
          </ListGroupItem>
        );
      })}
    </div>
  );
};

renderSelectedDrugs = formValues("selectedDrugs")(renderSelectedDrugs);

var DrugsForm = ({ handleSubmit, ...props }) => (
  <form>
    <ListGroup className="mt-2 col">
      <FieldArray
        name="selectedDrugs"
        component={renderSelectedDrugs}
        props={props}
      />
      <ListGroupItem>
        <button type="button" className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </ListGroupItem>
    </ListGroup>
  </form>
);

DrugsForm = reduxForm({
  form: formName
})(DrugsForm);

export default DrugsForm;
