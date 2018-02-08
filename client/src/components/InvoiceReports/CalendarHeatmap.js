import React, { Component } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import moment from "moment";

export default ({ data, numClasses = 5, onClick }) => {
  var maxAmount = Math.max(...data.map(datum => datum["amount"])) || 1;
  // var maxAmount = _.max(_.map(data, "amount")) || 1; // in case max is 0
  var dates = data.map(({ date }) => new Date(date));
  // BUG? for some reason have to go back 1 day for start date...
  var minDate = moment(Math.min(...dates))
    .add(-1, "days")
    .format("YYYY-MM-DD");
  var maxDate = moment(Math.max(...dates)).format("YYYY-MM-DD");
  return (
    <CalendarHeatmap
      startDate={minDate}
      endDate={maxDate}
      values={data}
      tooltipDataAttrs={{ "data-toggle": "tooltip" }}
      titleForValue={value =>
        `${value
          ? moment(value.date).format("ddd, D-MM-YYYY")
          : "unknown"}, Total is Rs. ${value ? value.amount : "unknown"}`}
      classForValue={value => {
        if (!value) {
          return "color-empty";
        }
        return `color-gitlab-${Math.ceil(
          value.amount / maxAmount * (numClasses - 1)
        )}`;
      }}
      onClick={onClick}
      showWeekdayLabels={true}
    />
  );
};
