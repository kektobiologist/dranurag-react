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

import FlipMove from "react-flip-move";

import SelectedDrugCard from "./SelectedDrugCard";
import { formName } from "../../config/config";

class FlipMoveItem extends Component {
  // because flipmove only works on stateful items
  render() {
    return <ListGroupItem>{this.props.children}</ListGroupItem>;
  }
}

var renderSelectedDrugs = ({ fields, selectedDrugs, handleSubmit }) => {
  return (
    <FlipMove>
      {fields.map((drug, idx) => {
        return (
          <FlipMoveItem key={selectedDrugs[idx].drugMeta.flipMoveKey}>
            <SelectedDrugCard
              drug={drug}
              drugMeta={selectedDrugs[idx].drugMeta}
              onRemove={() => {
                fields.remove(idx);
              }}
            />
          </FlipMoveItem>
        );
      })}
    </FlipMove>
  );
};

renderSelectedDrugs = formValues("selectedDrugs")(renderSelectedDrugs);

var DrugsForm = ({ handleSubmit }) => (
  <form>
    <ListGroup className="col">
      <FieldArray
        name="selectedDrugs"
        component={renderSelectedDrugs}
        handleSubmit={handleSubmit}
      />
    </ListGroup>
  </form>
);

DrugsForm = reduxForm({
  form: formName,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmoun
})(DrugsForm);

export default DrugsForm;
