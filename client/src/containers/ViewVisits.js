import React, { Component } from "react";
import { Row, Col, ListGroup } from "reactstrap";
import Spinner from "../components/util/Spinner";
import VisitCard from "../components/Home/VisitCard";
import moment from "moment";

class ViewVisits extends Component {
  state = {
    date: undefined,
    focused: undefined,
    visits: undefined,
    loading: false
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    import("react-dates").then(({ SingleDatePicker, isInclusivelyBeforeDay }) =>
      this.setState({ SingleDatePicker, isInclusivelyBeforeDay })
    );
  }
  onDateChange = date => {
    this.setState({ date, loading: true, visits: undefined });
    // react-dates by default selects 12:00 pm of the day as time
    // with default timezone set through moment-timezone in App.js.
    // so need to subtract 12:00 hours to get beginning of day.

    // actually no need to correct date now, it's done in backend only
    fetch("/api/visit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ date: date }),
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => res.filter(({ patient }) => patient))
      .then(visits => this.setState({ visits }))
      .then(() => this.setState({ loading: false }));
  };
  render() {
    const {
      visits,
      loading,
      SingleDatePicker,
      isInclusivelyBeforeDay
    } = this.state;
    return (
      <div>
        <div className="d-flex">
          <div className="mx-auto px-auto">
            {SingleDatePicker && isInclusivelyBeforeDay ? (
              <SingleDatePicker
                date={this.state.date} // momentPropTypes.momentObj or null
                onDateChange={this.onDateChange} // PropTypes.func.isRequired
                // TODO: removing focused makes app freeze?
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                // somehow this makes only past dates selectable
                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                showDefaultInputIcon={true}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <hr />
        <Spinner loading={loading} size={10} />
        <ListGroup>
          {visits
            ? visits.map((visit, idx) => (
                <VisitCard key={visit._id} visit={visit} />
              ))
            : ""}
        </ListGroup>
      </div>
    );
  }
}

export default ViewVisits;
