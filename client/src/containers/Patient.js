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
import ScanPrescriptionCard from "../components/Patient/ScanPrescriptionCard";
import AddInvoiceCard from "../components/Patient/AddInvoiceCard";
import {
  GeneratedPrescriptionsBox,
  ScannedPrescriptionsBox
} from "../components/Patient/PatientPrescriptionsBoxes";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchPatientData,
  refreshPatientScannedPrescriptions
} from "../actions/actions";

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
    const { match, fetchPatient } = props;
    // console.log(match);
    this.state = {
      id: match.params.id,
      showDeleteModal: false
    };

    fetchPatient(this.state.id);
  }

  toggleDeleteModal = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  };

  onDeletePatient = () => {
    const { id } = this.state;
    const { history } = this.props;
    fetch(`/api/deletePatient/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(() => history.push("/"));
  };

  onScanUploaded = () => {
    const { refreshScannedPrescriptions } = this.props;
    refreshScannedPrescriptions();
  };

  render() {
    const { id, showDeleteModal } = this.state;
    const {
      patient,
      scannedPrescriptions,
      generatedPrescriptions
    } = this.props;
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
        <div className="row">
          <div className="col">
            <ScanPrescriptionCard
              patientId={id}
              onScanUploaded={this.onScanUploaded}
            />
          </div>
          <div className="col">
            <AddInvoiceCard patientId={id} />
          </div>
        </div>
        <hr />
        <div>
          {scannedPrescriptions ? (
            <ScannedPrescriptionsBox prescriptions={scannedPrescriptions} />
          ) : (
            "Loading scanned prescriptions..."
          )}
        </div>
        <div>
          {generatedPrescriptions ? (
            <GeneratedPrescriptionsBox prescriptions={generatedPrescriptions} />
          ) : (
            "Loading gererated prescriptions..."
          )}
        </div>
      </div>
    );
  }
}

PatientWithLoad = withRouter(PatientWithLoad);
PatientWithLoad = connect(
  state => {
    var patientData = state.patientData;
    delete patientData.id; // don't want to overwrite id passed to PatientWithLoad
    return patientData;
  },
  dispatch => ({
    fetchPatient: id => dispatch(fetchPatientData(id)),
    refreshScannedPrescriptions: () =>
      dispatch(refreshPatientScannedPrescriptions())
  })
)(PatientWithLoad);
export default PatientWithLoad;
