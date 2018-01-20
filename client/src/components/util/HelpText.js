import React from "react";
import moment from "moment";
import Editable from "./popover-editable/Editable";
// this is so much bullshit
export default ({ patient, editable = false }) => {
  // age is now a populated virtual, but algolia doesn't have that virtual
  // use inferred birthdate in that case
  // inferredBirthdate is sometimes date, sometimes {'$date': date} ...
  var inferredBirthdate = patient.inferredBirthdate;
  if (inferredBirthdate && inferredBirthdate["$date"])
    inferredBirthdate = inferredBirthdate["$date"];
  var age =
    patient.age ||
    (inferredBirthdate
      ? moment(new Date()).diff(inferredBirthdate, "years")
      : undefined);
  if (editable) {
    var endpoint = `/api/v1/Patient/${patient._id}`;
    return (
      <div>
        <Editable
          initialValue={patient.sex}
          fieldName="sex"
          title="Edit Sex"
          display={value => <span>{value == "Male" ? "M" : "F"}</span>}
          endpoint={endpoint}
          inputType="select"
          selectValues={["Male", "Female"]}
        />
        {" / "}
        <Editable
          initialValue={age || "0"}
          fieldName="age"
          title="Edit Age"
          display={value => <span> {`${value || "0"} yrs`}</span>}
          endpoint={endpoint}
        />
        {" / "}
        {<i className="fa fa-phone px-1" />}
        <Editable
          initialValue={patient.phone1 || ""}
          fieldName="phone1"
          title="Edit Phone Number"
          display={value => <span> {value || "none"}</span>}
          endpoint={endpoint}
        />
      </div>
    );
  } else {
    return (
      <div>
        {patient.sex === "Male" ? "M" : "F"}
        {age ? " / " + age + " yrs" : ""}
        {patient.phone1 ? " / " : ""}
        {patient.phone1 ? <i className="fa fa-phone px-1" /> : ""}
        {patient.phone1 ? patient.phone1 : ""}
      </div>
    );
  }
};
