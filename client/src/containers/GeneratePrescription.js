import React, { Component } from "react";
import { Row, Col, Grid } from "reactstrap";
import PatientInfoCard from "../components/Patient/PatientInfoCard";
import { Link } from "react-router-dom";
import MultiStep from "../components/util/react-multistep";
import DrugSearchPanel from "../components/GeneratePrescription/DrugSearchPanel";
import PreviewPanel from "../components/GeneratePrescription/PreviewPanel";

export default class GeneratePrescription extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    // console.log(match);
    this.state = {
      patient: null,
      id: match.params.id
    };
  }

  componentDidMount() {
    const { id } = this.state;
    fetch("/api/patient/" + id)
      .then(res => res.json())
      .then(patient => this.setState({ patient: patient }));
    return;
  }

  render() {
    const { patient, id } = this.state;
    const steps = [
      {
        name: "Enter Drugs",
        component: <DrugSearchPanel onDrugClicked={() => {}} />
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
        <MultiStep showNavigation={true} steps={steps} />
      </div>
    );
  }
}
