import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import "../font-awesome.min.css";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

import { Container } from "reactstrap";

import { defaultPrescriptions, defaultPatient, defaultVisits } from "./data";

import PatientInfoCard from "../components/Patient/PatientInfoCard";
import PatientPrescriptionsCard from "../components/Patient/PatientPrescriptionsCard";
import FlipMoveDemo from "../components/experiments/FlipMoveDemo";
import VisitCard from "../components/Home/VisitCard";
import { BrowserRouter } from "react-router-dom";
import TodoList from "../components/experiments/TodoList";
import Search from "../components/experiments/AlgoliaSearchHelper";

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

storiesOf("Patient/PatientInfoCard", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("default", () => {
    return <PatientInfoCard patient={defaultPatient} />;
  });

storiesOf("Patient/PatientPrescriptionsCard", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("default", () => {
    return <PatientPrescriptionsCard prescriptions={defaultPrescriptions} />;
  });

storiesOf("Demos/FlipMoveDemo", module).add("default", () => {
  return <FlipMoveDemo visits={defaultVisits.slice(0, 10)} />;
});

storiesOf("VisitCard", module).add("default", () => {
  return (
    <BrowserRouter>
      <VisitCard visit={defaultVisits[0]} />
    </BrowserRouter>
  );
});

storiesOf("Demos/TodoList", module).add("default", () => {
  return <TodoList />;
});

storiesOf("Demos/AlgoliaSearchHelper", module).add("default", () => {
  return <Search />;
});
