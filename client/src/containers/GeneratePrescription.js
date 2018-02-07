import React, { Component } from "react";
import { Row, Col, Grid } from "reactstrap";
import PatientInfoCard from "../components/Patient/PatientInfoCard";
import { Link } from "react-router-dom";
import MultiStep from "../components/util/react-multistep";
import DrugSearchPanel from "../components/GeneratePrescription/DrugSearchPanel";
import PreviewPanel from "../components/GeneratePrescription/PreviewPanel";
import DiagnosisAndReviewPanel from "../components/GeneratePrescription/DiagnosisAndReviewPanel";
import { fetchPatientData } from "../actions/actions";
import { formName } from "../config/config";
import {
  Field,
  FieldArray,
  reduxForm,
  formValues,
  formValueSelector,
  change,
  reset
} from "redux-form";
import { connect } from "react-redux";

class GeneratePrescription extends Component {
  constructor(props) {
    super(props);
    const { match, fetchPatient } = props;
    // console.log(match);
    this.state = {
      id: match.params.id
    };
    fetchPatient(this.state.id);
  }

  render() {
    const { id } = this.state;
    const {
      reinitializeForm,
      clearForm,
      patient,
      latestPrescription
    } = this.props;
    const steps = [
      {
        name: "Diagnosis and Review",
        component: <DiagnosisAndReviewPanel />
      },
      {
        name: "Enter Drugs",
        component: <DrugSearchPanel />
      },
      { name: "Preview", component: <PreviewPanel patientId={id} /> }
    ];
    return (
      <div>
        <div className="container">
          {patient ? (
            <PatientInfoCard patient={patient}>
              <Link
                to={"/patient/" + patient._id}
                className="btn btn-outline-primary"
                role="button"
              >
                Back to Profile
              </Link>
            </PatientInfoCard>
          ) : (
            ""
          )}
        </div>
        <hr />
        <div className="container">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={() => reinitializeForm(latestPrescription)}
            disabled={latestPrescription ? false : true}
          >
            Copy Previous Prescription
          </button>
          <button
            className="btn btn-outline-primary ml-2"
            type="button"
            onClick={clearForm}
          >
            Clear Prescription
          </button>
        </div>
        <MultiStep showNavigation={true} steps={steps} />
      </div>
    );
  }
}

// connecting to the global store
GeneratePrescription = connect(null, dispatch => ({
  reinitializeForm: prescription => {
    if (prescription) {
      dispatch(change(formName, "selectedDrugs", prescription.selectedDrugs));
      dispatch(
        change(
          formName,
          "hindiCheckbox",
          prescription.language == "hindi" ? true : false
        )
      );
    }
  },
  clearForm: () => dispatch(reset(formName))
}))(GeneratePrescription);

// nested connect?
GeneratePrescription = connect(
  state => ({
    patient: state.patientData.patient,
    latestPrescription: state.patientData.latestPrescription
  }),
  dispatch => ({
    fetchPatient: id => dispatch(fetchPatientData(id))
  })
)(GeneratePrescription);

export default GeneratePrescription;
