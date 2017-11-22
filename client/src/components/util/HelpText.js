import React from "react";
import moment from "moment";

// this is so much bullshit
export default ({ patient }) => {
  var age = undefined;
  if (patient.inferredBirthdate)
    age = moment(new Date()).diff(patient.inferredBirthdate, "years");

  return (
    <div>
      {patient.sex === "Male" ? "M" : "F"}
      {age ? " / " + age + " yrs" : ""}
      {patient.phone1 ? " / " : ""}
      {patient.phone1 ? <i className="fa fa-phone px-1" /> : ""}
      {patient.phone1 ? patient.phone1 : ""}
    </div>
  );
};
