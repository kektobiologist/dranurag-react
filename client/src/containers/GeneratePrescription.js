import React, { Component } from "react";
import { Row, Col, Grid } from "reactstrap";
import PatientInfoCard from "../components/Patient/PatientInfoCard";
import { Link } from "react-router-dom";
import MultiStep from "../components/util/react-multistep";
import DrugSearchPanel from "../components/GeneratePrescription/DrugSearchPanel";
import PreviewPanel from "../components/GeneratePrescription/PreviewPanel";

import { formName } from "../config/config";
import {
  Field,
  FieldArray,
  reduxForm,
  formValues,
  formValueSelector,
  change
} from "redux-form";
import { connect } from "react-redux";

class GeneratePrescription extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    // console.log(match);
    this.state = {
      patient: null,
      latestPrescription: null,
      id: match.params.id
    };
  }

  componentDidMount() {
    const { id } = this.state;
    fetch("/api/patient/" + id)
      .then(res => res.json())
      .then(patient => this.setState({ patient: patient }));
    fetch("/api/getLatestPrescriptionJSON/" + id)
      .then(res => res.json())
      // check if empty response
      .then(
        latestPrescription =>
          latestPrescription._id ? this.setState({ latestPrescription }) : ""
      );
    return;
  }

  render() {
    const { patient, id, latestPrescription } = this.state;
    const { reinitializeForm } = this.props;
    const steps = [
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
            "Loading patient..."
          )}
        </div>
        <hr />
        <div className="container">
          <button
            className="btn btn-outline-primary"
            role="button"
            onClick={() => reinitializeForm(latestPrescription)}
            disabled={latestPrescription ? false : true}
          >
            Copy Previous Prescription
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
  }
}))(GeneratePrescription);

export default GeneratePrescription;
