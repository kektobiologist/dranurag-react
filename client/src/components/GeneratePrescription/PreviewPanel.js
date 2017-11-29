// show the drugs/tests/advice preview
import React, { Component } from "react";
import { connect } from "react-redux";
import { formName } from "../../config/config";
import DrugPreviewCard from "./DrugPreviewCard";
import { ListGroup, ListGroupItem } from "reactstrap";
import {
  Field,
  FieldArray,
  reduxForm,
  formValues,
  formValueSelector
} from "redux-form";
import { withRouter } from "react-router-dom";

import { getReadableDrug } from "../util/DrugACFormatter";
import PDFWidget from "./PDFWidget";

const HindiCheckBox = ({ input: { value, onChange } }) => (
  <div className="form-check">
    <label className="form-check-label">
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="form-check-input"
      />
      Use Hindi
    </label>
  </div>
);

const DrugsTable = ({ input: { value }, drugs }) => {
  return (
    <tbody>
      {// reverse order
      drugs
        .slice(0)
        .reverse()
        .map((drug, idx) => {
          var readableDrug = getReadableDrug(drug, value ? "hindi" : "english");
          return (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>
                <DrugPreviewCard drug={drug} />
              </td>
              <td>{readableDrug.dosage ? readableDrug.dosage : ""}</td>
              <td>{readableDrug.frequency ? readableDrug.frequency : ""}</td>
              <td>
                {readableDrug.specialComments
                  ? readableDrug.specialComments
                  : ""}
              </td>
              <td>
                {readableDrug.duration
                  ? `${readableDrug.duration.number} ${readableDrug.duration
                      .type}`
                  : ""}
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};

class PreviewPanel extends React.Component {
  state = {
    data: undefined
  };

  getPrescription = () => {
    const { drugs, hindiChecked, patientId } = this.props;
    var translatedDrugs = drugs.map(drug =>
      getReadableDrug(drug, hindiChecked ? "hindi" : "english")
    );

    return {
      patient: patientId,
      selectedDrugs: drugs,
      translatedDrugs: translatedDrugs,
      language: hindiChecked ? "hindi" : "english"
    };
  };

  onPreviewClicked = () => {
    var prescription = this.getPrescription();
    fetch(`/api/previewPrescriptionPdf`, {
      method: "POST",
      headers: {
        Accept: "application/pdf",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prescription),
      credentials: "include"
    })
      .then(res => res.arrayBuffer())
      .then(res => {
        return res;
      })
      .then(res => this.setState({ data: res }))
      .catch(err => console.log(err));
  };

  onSubmitClicked = () => {
    var prescription = this.getPrescription();
    const { history, patientId, reset } = this.props;
    fetch(`/api/submitPrescription`, {
      method: "POST",
      headers: {
        Accept: "application/pdf",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prescription),
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        if (res == "NOTOK") throw { message: "Could not submit form" };
        else return res;
      })
      .then(res => {
        history.push(`/patient/${patientId}`);
        reset();
        window.open(`/api/prescriptionPdf/${res._id}`);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { drugs, hindiChecked } = this.props;
    const { data } = this.state;
    if (!drugs) return <div />;
    return (
      <div>
        <Field component={HindiCheckBox} name="hindiCheckbox" />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Medicine</th>
              <th scope="col">Dosage</th>
              <th scope="col">Schedule</th>
              <th scope="col">Instructions</th>
              <th scope="col">Duration</th>
            </tr>
          </thead>
          <Field component={DrugsTable} name="hindiCheckbox" drugs={drugs} />
        </table>
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <a
              role="button"
              className="btn btn-outline-primary pl-2"
              onClick={this.onPreviewClicked}
              href="#"
            >
              Preview PDF
            </a>
          </div>
          <div className="col-auto pr-2">
            <a
              role="button"
              className="btn btn-outline-primary"
              onClick={this.onSubmitClicked}
              href="#"
            >
              Submit
            </a>
          </div>
        </div>

        {data ? <PDFWidget file={{ data: data }} /> : ""}
      </div>
    );
  }
}

PreviewPanel = withRouter(PreviewPanel);

const selector = formValueSelector(formName);

PreviewPanel = reduxForm({
  form: formName,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmoun
})(PreviewPanel);

// TODO: can probably do without this connect since everything should be connected
// through reduxForm
PreviewPanel = connect(state => ({
  drugs: selector(state, "selectedDrugs"),
  hindiChecked: selector(state, "hindiCheckbox")
}))(PreviewPanel);

export default PreviewPanel;
