import React, { Component } from "react";
import { ListGroup, ListGroupItem, Collapse } from "reactstrap";
import { connect } from "react-redux";
import { refreshPatientInvoices } from "../../actions/actions";
import moment from "moment";
import Spinner from "../util/Spinner";

var InvoiceCard = ({ invoice }) => {
  const { _id, timestamp, amount } = invoice;
  return (
    <div>
      <span className="text-muted">#{_id}. </span>
      <span>Rs. {amount}</span>
      <span className="text-muted pull-right">
        {`${moment(timestamp).format("ddd, D MMM YY")} (${moment(
          timestamp
        ).fromNow()})`}
      </span>
    </div>
  );
};

class AddInvoiceCard extends Component {
  state = {
    value: 500, // Rs 500 is default
    collapse: false,
    loading: false
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onSubmit = () => {
    const { patientId, refreshInvoices } = this.props;
    const { value } = this.state;
    this.setState({ loading: true });
    fetch(`/api/addInvoice`, {
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
    const { loading } = this.state;
    return (
      <div className="card">
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

        <Collapse isOpen={this.state.collapse}>
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
                    <InvoiceCard invoice={invoice} />
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
