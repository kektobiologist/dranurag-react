import React, { Component } from "react";
import { ListGroup, ListGroupItem, Collapse } from "reactstrap";
import { connect } from "react-redux";
import { refreshPatientInvoices } from "../../actions/actions";
import moment from "moment";
import Spinner from "../util/Spinner";
import DeletionModal from "../util/DeletionModal";
import { toCurrency } from "../util/util";

var InvoiceCard = ({ invoice, onDelete }) => {
  const { _id, date, amount } = invoice;
  return (
    <div>
      <a href={`/api/invoice/pdf/${_id}`} target="_blank">
        <span className="text-muted">#{_id}. </span>
        <span>Rs. {toCurrency(amount)}</span>
      </a>

      <span className="text-muted pull-right">
        {`${moment(date).format("D MMM 'YY")}`}
        <button
          type="button"
          className="close ml-3"
          aria-label="Close"
          onClick={() => onDelete(_id)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </span>
    </div>
  );
};

class AddInvoiceCard extends Component {
  state = {
    value: 500, // Rs 500 is default
    collapse: false,
    loading: false,
    showDeleteModal: false,
    deletionId: null
  };

  toggleDeleteModal = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

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

  onSubmit = () => {
    const { patientId, refreshInvoices } = this.props;
    const { value } = this.state;
    this.setState({ loading: true });
    fetch(`/api/invoice/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ patientId, amount: value }),
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
            <div className="d-flex">
              <div className="input-group pr-2">
                <div className="input-group-prepend">
                  <span className="input-group-text">Rs.</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={this.state.value}
                  onChange={this.onChange}
                />
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
    invoices: state.patientData.invoices
  }),
  dispatch => ({
    refreshInvoices: () => dispatch(refreshPatientInvoices())
  })
)(AddInvoiceCard);

export default AddInvoiceCard;
