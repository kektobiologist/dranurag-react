import React, { Component } from "react";
import {
  Field,
  FieldArray,
  reduxForm,
  formValues,
  formValueSelector
} from "redux-form";
import { formName } from "../../config/config";

const ReviewAfterResultsCheckbox = ({ input: { value, onChange } }) => (
  <div className="form-check">
    <label className="form-check-label">
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="form-check-input"
      />
      Review After Test Results
    </label>
  </div>
);

class Panel extends Component {
  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group row" id="diagnosis">
            <label htmlFor="diagnosis" className="col-form-label col">
              Diagnosis:
            </label>
            <div className="col">
              <Field
                component="input"
                type="text"
                name="diagnosis"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row" id="review">
            <label htmlFor="review" className="col-form-label col">
              Review After:
            </label>
            <div className="col">
              <div>
                <Field
                  component="input"
                  type="number"
                  name="review.number"
                  className="form-control"
                />
              </div>
              <div className="pt-2">
                <Field
                  component="select"
                  className="form-control"
                  name="review.type"
                >
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="months">months</option>
                  <option value="years">years</option>
                </Field>
              </div>
              <div className="pt-2">
                <Field
                  component={ReviewAfterResultsCheckbox}
                  name="reviewAfterResults"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// TODO: initialValues call nulls the other form values! be careful when making this form after
// other forms are initialized.
Panel = reduxForm({
  form: formName,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmoun
  initialValues: {
    diagnosis: "",
    review: {
      number: 10,
      type: "days"
    },
    reviewAfterResults: false
  }
})(Panel);

export default Panel;
