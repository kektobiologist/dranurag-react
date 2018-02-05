import React, { Component } from "react";
import DateRangePicker from "../components/InvoiceReports/DateRangePicker";
import CalendarHeatmap from "../components/InvoiceReports/CalendarHeatmap";
import moment from "moment";
import { ListGroup, ListGroupItem } from "reactstrap";

var SelectedDayReport = ({ date, amount, invoices }) => (
  <div className="card">
    <div className="card-body">
      <h3 className="card-title">
        Invoices for {moment(date).format("ddd, Do MMM 'YY")}
      </h3>
      <ListGroup>
        {invoices.map(({ _id, patient, amount }, idx) => (
          <ListGroupItem key={idx}>
            <span className="text-muted">Inv #{_id}</span>
            <span> {patient.name}</span>
            <span className="pull-right">Rs. {amount}</span>
          </ListGroupItem>
        ))}
        <ListGroupItem key={"total"} color="dark">
          <span>Total:</span>
          <span className="pull-right">Rs. {amount}</span>
        </ListGroupItem>
      </ListGroup>
    </div>
  </div>
);

class InvoiceReports extends Component {
  state = {
    data: null,
    selectedDayData: null
  };

  onDatesChange = (startDate, endDate) => {
    // again these are react-dates date and ar 12:00pm local time, so need
    // to subtract 12 hours to get beginning of day.
    // to make endDate inclusive, will add 12 hours instead.
    startDate.setHours(startDate.getHours() - 12);
    endDate.setHours(endDate.getHours() + 12);
    fetch(`/api/getInvoiceHeatmapData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ startDate, endDate }),
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => this.setState({ data }));
  };

  render() {
    const { data, selectedDayData } = this.state;
    return (
      <div>
        <div className="d-flex">
          <div className="mx-auto px-auto">
            <DateRangePicker onChange={this.onDatesChange} />
          </div>
        </div>
        <hr />
        <div className="row mb-3">
          <div className="col mx-auto" style={{ maxHeight: "400px" }}>
            {data ? (
              <CalendarHeatmap
                data={data}
                onClick={selectedDayData => this.setState({ selectedDayData })}
              />
            ) : (
              ""
            )}
          </div>
          <div className="col">
            {selectedDayData ? <SelectedDayReport {...selectedDayData} /> : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default InvoiceReports;
