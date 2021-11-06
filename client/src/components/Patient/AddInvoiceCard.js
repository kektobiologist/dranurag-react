import React, { Component } from "react";
import { ListGroup, ListGroupItem, Collapse } from "reactstrap";
import { connect } from "react-redux";
import { refreshPatientInvoices } from "../../actions/actions";
import moment from "moment";
import Spinner from "../util/Spinner";
import DeletionModal from "../util/DeletionModal";
import { SingleDatePicker, isInclusivelyBeforeDay } from "react-dates";
import InvoiceCard from "./InvoiceCard";
import { toast } from "react-toastify";

class AddInvoiceCard extends Component {
  state = {
    amount: 800, // Rs 800 is default,
    paymentMode: 'CASH',
    collapse: false,
    loading: false,
    showDeleteModal: false,
    deletionId: null,
    date: moment(),
    focuses: undefined,
    sendingEmail: false
  };

  toggleDeleteModal = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  };

  onChangeAmount = event => {
    this.setState({ amount: event.target.value });
  };

  onChangePaymentMode = event => {
    this.setState({ paymentMode: event.target.value });
  }

  onDeleteInvoice = invoiceId => {
    const { refreshInvoices } = this.props;
    this.toggleDeleteModal();
    this.setState({ loading: true });
    fetch(`/api/invoice/delete/${invoiceId}`, { credentials: "include" })
      .then(res => res.json())
      .then(() => this.setState({ loading: false }))
      .then(refreshInvoices)
      .catch(() => this.setState({ loading: false }));
  };

  onEmail = (invoiceId) => {
    const { email } = this.props.patient;
    this.setState({sendingEmail: true})
    fetch(`/api/invoice/sendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: invoiceId, email }),
      credentials: "include"
    })
      .then(res => {
        if (res.status == 200) {
          toast.success("Email Sent.")
        } else {
          toast.error(`Error sending mail: ${res.statusText}`)
        }
      })
      .catch((err) => toast.error(`Error sending email: ${err}`))
      .then(() => this.setState({ sendingEmail: false }))
  }

  onSubmit = () => {
    const { patientId, refreshInvoices } = this.props;
    const { amount, paymentMode, date } = this.state;
    this.setState({ loading: true });
    fetch(`/api/invoice/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ patientId, amount, paymentMode, date }),
      credentials: "include"
    })
      .then(res => res.json())
      .then(() => this.setState({ loading: false }))
      .then(refreshInvoices);
  };

  onCollapseClick = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    const { invoices } = this.props;
    const { loading, showDeleteModal, deletionId, collapse } = this.state;
    return (
      <div className="card">
        <DeletionModal
          show={showDeleteModal}
          toggle={this.toggleDeleteModal}
          onDeleteClicked={() => this.onDeleteInvoice(deletionId)}
          title="Delete Invoice"
          body={`Are you sure you want to delete invoice #${deletionId}?`}
        />
        <div className="card-header" id="headingOne">
          <button
            type="button"
            onClick={this.onCollapseClick}
            className="btn btn-link"
            style={{ color: "black" }}
          >
            <h4 className="mb-0">Invoices</h4>
          </button>
        </div>

        <Collapse isOpen={collapse}>
          <div className="card-body">
            <div className="d-flex align-items-center">
              <SingleDatePicker
                date={this.state.date} // momentPropTypes.momentObj or null
                onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                // TODO: removing focused makes app freeze?
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                // somehow this makes only past dates selectable
                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                showDefaultInputIcon={false}
                small={true}
                displayFormat={"MMM D"}
              />
              <div className="input-group px-2">
                <div className="input-group-prepend">
                  <span className="input-group-text">Rs.</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={this.state.amount}
                  onChange={this.onChangeAmount}
                />
                <select 
                  value={this.state.paymentMode} 
                  className="form-control" 
                  id="paymentModeFormControl"
                  onChange={this.onChangePaymentMode}
                  >
                  <option>CASH</option>
                  <option>PAYTM</option>
                  <option>UPI</option>
                  <option>CARD</option>
                </select>
              </div>
              <div>
                <button
                  className="btn btn-outline-primary mr-2"
                  type="button"
                  onClick={this.onSubmit}
                >
                  Add Invoice
                </button>
              </div>
            </div>
            <div className="pt-3">
              <Spinner loading={loading} size={10} />
            </div>
            <hr className="py-2" />
            {invoices ? (
              <ListGroup>
                {invoices.map((invoice, idx) => (
                  <ListGroupItem key={idx}>
                    <InvoiceCard
                      invoice={invoice}
                      onDelete={invoiceId => {
                        this.setState({ deletionId: invoiceId });
                        this.toggleDeleteModal();
                      }}
                      onEmail={this.onEmail}
                      emailDisabled={!(this.props.patient && this.props.patient.email) || this.state.sendingEmail}
                    />
                  </ListGroupItem>
                ))}
              </ListGroup>
            ) : (
                ""
              )}
          </div>
        </Collapse>
      </div>
    );
  }
}

AddInvoiceCard = connect(
  state => ({
    invoices: state.patientData.invoices,
    patient: state.patientData.patient
  }),
  dispatch => ({
    refreshInvoices: () => dispatch(refreshPatientInvoices())
  })
)(AddInvoiceCard);

export default AddInvoiceCard;
