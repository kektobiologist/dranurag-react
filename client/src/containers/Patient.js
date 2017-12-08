import React, { Component } from "react";
import {
  Row,
  Col,
  Grid,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button
} from "reactstrap";
import PatientInfoCard from "../components/Patient/PatientInfoCard";
import ScannedPatientPrescriptionsCard from "../components/Patient/ScannedPatientPrescriptionsCard";
import GeneratedPatientPrescriptionsCard from "../components/Patient/GeneratedPatientPrescriptionsCard";
import ScanPrescriptionCard from "../components/Patient/ScanPrescriptionCard";
import { Link, withRouter } from "react-router-dom";

const DeletePatientModal = ({ toggle, show, onDeleteClicked, patientId }) => (
  <Modal isOpen={show} toggle={toggle}>
    <ModalHeader toggle={toggle}>Delete Patient</ModalHeader>
    <ModalBody>
      Are you sure you want to delete patient #{patientId} ?
    </ModalBody>
    <ModalFooter>
      <Button color="danger" onClick={onDeleteClicked}>
        Delete
      </Button>{" "}
      <Button color="secondary" onClick={toggle}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);

class PatientWithLoad extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    // console.log(match);
    this.state = {
      patient: null,
      scannedPrescriptions: null,
      generatedPrescriptions: null,
      id: match.params.id,
      showDeleteModal: false
    };
  }

  toggleDeleteModal = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  };

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

  onDeletePatient = () => {
    const { id } = this.state;
    const { history } = this.props;
    fetch(`/api/deletePatient/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(() => history.push("/"));
  };

  render() {
    const {
      patient,
      scannedPrescriptions,
      generatedPrescriptions,
      id,
      showDeleteModal
    } = this.state;
    return (
      <div>
        <DeletePatientModal
          show={showDeleteModal}
          toggle={this.toggleDeleteModal}
          onDeleteClicked={this.onDeletePatient}
          patientId={id}
        />
        <div>
          {patient ? (
            <PatientInfoCard patient={patient}>
              <div className="d-flex">
                <div>
                  <Link
                    to={"/generatePrescription/" + patient._id}
                    className="btn btn-outline-primary"
                    role="button"
                  >
                    Generate Prescription
                  </Link>
                </div>
                <div className="pl-2">
                  <a
                    role="button"
                    href="#"
                    className="btn btn-outline-danger"
                    onClick={this.toggleDeleteModal}
                  >
                    Delete Profile
                  </a>
                </div>
              </div>
            </PatientInfoCard>
          ) : (
            ""
          )}
        </div>
        <hr />
        <ScanPrescriptionCard patientId={id} />
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

PatientWithLoad = withRouter(PatientWithLoad);

export default PatientWithLoad;
