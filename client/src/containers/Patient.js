import React, { Component } from "react";
import { Row, Col, Grid } from "reactstrap";
import PatientInfoCard from "../components/Patient/PatientInfoCard";
import PatientPrescriptionsCard from "../components/Patient/PatientPrescriptionsCard";

export default class PatientWithLoad extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    // console.log(match);
    this.state = {
      patient: null,
      prescriptions: null,
      id: match.params.id
    };
  }

  componentDidMount() {
    const { id } = this.state;
    fetch("/api/patient/" + id)
      .then(res => res.json())
      .then(patient => this.setState({ patient: patient }));
    fetch("/api/patientPrescriptions/" + id)
      .then(res => res.json())
      .then(prescriptions => this.setState({ prescriptions: prescriptions }));
  }

  render() {
    const { patient, prescriptions, id } = this.state;
    return (
      <div>
        <div>
          {patient ? (
            <PatientInfoCard patient={patient} />
          ) : (
            "Loading patient..."
          )}
        </div>
        <hr />
        <div>
          {prescriptions ? (
            <PatientPrescriptionsCard prescriptions={prescriptions} />
          ) : (
            "Loading prescriptions..."
          )}
        </div>
      </div>
    );
  }
}
