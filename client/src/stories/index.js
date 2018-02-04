import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import "../font-awesome.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../react-calendar-heatmap.css";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

import { Container } from "reactstrap";

import { defaultPrescriptions, defaultPatient, defaultVisits } from "./data";
import CalendarHeatmap from "react-calendar-heatmap";

import TodoList from "../components/experiments/TodoList";
storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>
  ));

storiesOf("TodoList", module).add("default", () => <TodoList />);

storiesOf("Calendar Heatmap", module).add("default", () => (
  <div className="container">
    <div className="row mb-3">
      <div className="col-xs-12 col-md-6">
        <CalendarHeatmap
          startDate={new Date("2016-01-01")}
          endDate={new Date("2016-04-01")}
          values={[
            { date: "2016-01-01", count: 1 },
            { date: "2016-01-22", count: 10 },
            { date: "2016-01-30", count: 15 }
            // ...and so on
          ]}
          tooltipDataAttrs={{ "data-toggle": "tooltip" }}
          titleForValue={value => `Date is ${value ? value.date : "unknown"}`}
          showOutOfRangeDays={true}
        />
      </div>
    </div>
  </div>
));
