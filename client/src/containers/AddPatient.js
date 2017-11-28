import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { addPatientFormName } from "../config/config";
import { Field, reduxForm, Form } from "redux-form";
import { withRouter } from "react-router-dom";

var FormField = ({ required, label, iconName, postAddonText, children }) => {
  return (
    <div className="form-group">
      <div className="input-group">
        <span className="input-group-addon">
          {iconName ? <i className={`fa ${iconName} fa-fw`} /> : ""}
        </span>
        {children}
        {postAddonText ? (
          <span className="input-group-addon">{postAddonText}</span>
        ) : (
          ""
        )}
      </div>
      <small className="text-muted form-text">
        {label} {required ? <span className="asterisk">*</span> : ""}
      </small>
    </div>
  );
};

var TextField = ({
  input: { value, onChange },
  placeholder,
  required,
  inputType,
  ...props
}) => (
  <FormField {...props} required={required}>
    <input
      type={inputType}
      className="form-control input-no-enter"
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyPress={e => {
        if (e.key === "Enter") e.preventDefault();
      }}
    />
  </FormField>
);

var SelectField = ({ input: { value, onChange }, options, ...props }) => (
  <FormField {...props}>
    <select value={value} onChange={onChange} className="form-control">
      {options.map(({ value, text }, idx) => (
        <option key={idx} value={value}>
          {text}
        </option>
      ))}
    </select>
  </FormField>
);

class AddPatient extends Component {
  onSubmit = values => {
    const { history } = this.props;
    fetch(`/api/addPatient`, {
      method: "POST",
      headers: {
        Accept: "application/pdf",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
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
