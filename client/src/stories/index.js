import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

import PatientInfoCard from "../components/Patient/PatientInfoCard";

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
var defaultPatient = {
  _id: 1017,
  name: "Arpit Tarang Saxena",
  sex: "Male",
  phone1: "7407650530",
  phone2: "",
  height: 169,
  weight: 68,
  allergies: "",
  bmi: 23.81,
  timestamp: 1508739645697,
  inferredBirthdate: "1993-10-23T06:20:45.697Z",
  __v: 0
};
storiesOf("PatientInfoCard", module).add("default", () => {
  return <PatientInfoCard patient={defaultPatient} />;
});
