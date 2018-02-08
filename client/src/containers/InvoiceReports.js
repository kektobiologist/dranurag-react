import React, { Component } from "react";
import CalendarHeatmap from "../components/InvoiceReports/CalendarHeatmap";
import SelectedDayReport from "../components/InvoiceReports/SelectedDayReport";
import moment from "moment";
import { ListGroup, ListGroupItem } from "reactstrap";
import { toCurrency } from "../components/util/util";
class InvoiceReports extends Component {
  state = {
    data: null,
    selectedDayData: null,
    startDate: null,
    endDate: null,
    DateRangePicker: undefined
  };

  componentDidMount() {
    // dynamic import DateRangePicker
    import("../components/InvoiceReports/DateRangePicker").then(
      ({ DateRangePicker }) => this.setState({ DateRangePicker })
    );
  }

  onDatesChange = (startDate, endDate) => {
    // again these are react-dates date and ar 12:00pm local time, so need
    // to subtract 12 hours to get beginning of day.
    // to make endDate inclusive, will add 12 hours instead.
    startDate.setHours(startDate.getHours() - 12);
    endDate.setHours(endDate.getHours() + 12);
    fetch(`/api/invoice/heatmapData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ startDate, endDate }),
      credentials: "include"
    })
      .then(res => res.json())
      // default to first day of selection
      .then(data =>
        this.setState({ data, selectedDayData: data[0], startDate, endDate })
      );
  };

  render() {
    const {
      data,
      selectedDayData,
      startDate,
      endDate,
      DateRangePicker
    } = this.state;
    var total = data ? data.reduce((sum, { amount }) => sum + amount, 0) : 0;
    return (
      <div>
        <div className="d-flex">
          <div className="mx-auto px-auto">
            {DateRangePicker ? (
              <DateRangePicker onChange={this.onDatesChange} />
            ) : (
              ""
            )}
          </div>
        </div>
        <hr />
        <div className="row mb-3">
          <div className="col-6 mx-auto" style={{ maxHeight: "400px" }}>
            {data ? (
              <CalendarHeatmap
                data={data}
                onClick={selectedDayData => this.setState({ selectedDayData })}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 pb-4">
            {selectedDayData ? <SelectedDayReport {...selectedDayData} /> : ""}
          </div>
          <div className="col-md-6">
            {data ? (
              <h3>
                <span className="pull-right">
                  Grand Total: Rs. {toCurrency(total)}
                </span>
              </h3>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default InvoiceReports;
