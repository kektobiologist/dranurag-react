import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { addPatientFormName } from "../config/config";
import { Field, reduxForm, Form } from "redux-form";
import { withRouter } from "react-router-dom";
import {
  FormField,
  TextField,
  SelectField
} from "../components/util/FormFields";

class AddPatient extends Component {
  onSubmit = values => {
    const { history } = this.props;
    fetch(`/api/patient/add`, {
      method: "POST",
      headers: {
        Accept: "application/pdf",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
      credentials: "include"
    })
      .then(res => res.json())
      .then(history.push("/"));
  };
  render() {
    const { pristine, submitting, handleSubmit } = this.props;
    return (
      <div>
        <h1 className="display-3">Add Patient</h1>
        <small>
          Fields marked with <span className="asterisk">*</span> are required
        </small>
        <hr className="my-4" />
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            component={TextField}
            name="name"
            required={true}
            label="Full Name"
            placeholder="Name"
            iconName="fa-user"
            inputType="text"
          />
          <Field
            component={SelectField}
            name="sex"
            required={false}
            label="Sex"
            iconName="fa-transgender"
            options={[
              { value: "Male", text: "Male" },
              { value: "Female", text: "Female" }
            ]}
          />
          <Field
            component={TextField}
            name="age"
            label="Age"
            placeholder="Age"
            iconName="fa-calendar"
            postAddonText="years"
            inputType="number"
          />
          <Field
            component={TextField}
            name="phone1"
            label="Phone Number"
            placeholder="Phone Number"
            iconName="fa-phone"
            inputType="tel"
          />
          <Field
            component={TextField}
            name="phone2"
            label="Alternate Phone Number"
            placeholder="Phone Number"
            iconName="fa-phone"
            inputType="tel"
          />
          <Field
            component={TextField}
            name="height"
            label="Height"
            placeholder="Height"
            iconName="fa-male"
            inputType="number"
            postAddonText="cm"
          />
          <Field
            component={TextField}
            name="weight"
            label="Weight"
            placeholder="Weight"
            iconName="fa-balance-scale"
            inputType="number"
            postAddonText="kg"
          />
          <button
            type="submit"
            className="btn btn-outline-primary"
            disabled={pristine || submitting}
          >
            Submit and Add Visit
          </button>
        </form>
      </div>
    );
  }
}

AddPatient = reduxForm({
  form: addPatientFormName
})(AddPatient);

AddPatient = withRouter(AddPatient);
export default AddPatient;
