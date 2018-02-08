import React, { Component } from "react";
import { DateRangePicker as DRP, isInclusivelyBeforeDay } from "react-dates";
import moment from "moment";
class DateRangePicker extends Component {
  state = {
    today: moment(),
    startDate: null,
    endDate: null,
    focusedInput: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
    if (startDate && endDate)
      this.props.onChange(new Date(startDate), new Date(endDate));
  };

  render() {
    const { startDate, endDate, today } = this.state;
    const { onChange } = this.props;
    return (
      <div>
        <DRP
          startDate={startDate} // momentPropTypes.momentObj or null
          startDateId={"START_DATE_ID"}
          endDate={endDate}
          endDateId={"END_DATE_ID"}
          onDatesChange={this.onDatesChange} // PropTypes.func.isRequired
          // TODO: removing focused makes app freeze?
          focusedInput={this.state.focusedInput} // PropTypes.bool
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired
          // somehow this makes only past dates selectable
          isOutsideRange={day => !isInclusivelyBeforeDay(day, today)}
          showDefaultInputIcon={true}
          displayFormat={"MMM D Y"}
          minimumNights={0} // enable 1 day selections
        />
      </div>
    );
  }
}

export { DateRangePicker };
