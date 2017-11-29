import React, { Component } from "react";
import { Row, Col, Grid } from "reactstrap";
import PatientInfoCard from "../components/Patient/PatientInfoCard";
import ScannedPatientPrescriptionsCard from "../components/Patient/ScannedPatientPrescriptionsCard";
import GeneratedPatientPrescriptionsCard from "../components/Patient/GeneratedPatientPrescriptionsCard";
import { Link } from "react-router-dom";
export default class PatientWithLoad extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    // console.log(match);
    this.state = {
      patient: null,
      scannedPrescriptions: null,
      generatedPrescriptions: null,
      id: match.params.id
    };
  }

  componentDidMount() {
    const { id } = this.state;
    fetch("/api/patient/" + id, { credentials: "include" })
      .then(res => res.json())
      .then(patient => this.setState({ patient: patient }));
    fetch(`/api/patientScannedPrescriptions/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(scannedPrescriptions => this.setState({ scannedPrescriptions }));
    fetch(`/api/patientGeneratedPrescriptionsInfo/${id}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(generatedPrescriptions =>
        this.setState({ generatedPrescriptions })
      );
  }

  render() {
    const {
      patient,
      scannedPrescriptions,
      generatedPrescriptions,
      id
    } = this.state;
    return (
      <div>
        <div>
          {patient ? (
            <PatientInfoCard patient={patient}>
              <Link
                to={"/generatePrescription/" + patient._id}
                className="btn btn-outline-primary"
                role="button"
              >
                Generate Prescription
              </Link>
            </PatientInfoCard>
          ) : (
            "Loading patient..."
          )}
        </div>
        <hr />
        <div>
          {scannedPrescriptions ? (
            <ScannedPatientPrescriptionsCard
              prescriptions={scannedPrescriptions}
            />
          ) : (
            "Loading scanned prescriptions..."
          )}
        </div>
        <div>
          {generatedPrescriptions ? (
            <GeneratedPatientPrescriptionsCard
              prescriptionInfos={generatedPrescriptions}
            />
          ) : (
            "Loading gererated prescriptions..."
          )}
        </div>
      </div>
    );
  }
}
