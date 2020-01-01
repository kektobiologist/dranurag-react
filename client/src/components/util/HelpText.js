import React from "react";
import moment from "moment";
import Editable from "./popover-editable/Editable";
import { updatePatientDataPatient } from "../../actions/actions";
import { connect } from "react-redux";
// this is so much bullshit
var HelpText = ({ patient, editable = false, updatePatient }) => {
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
          value={patient.sex}
          fieldName="sex"
          title="Edit Sex"
          display={value => <span>{value == "Male" ? "M" : "F"}</span>}
          inputType="select"
          selectValues={["Male", "Female"]}
          endpoint={endpoint}
          onUpdate={updatePatient}
        />
        {" / "}
        <Editable
          value={age || "0"}
          fieldName="age"
          title="Edit Age"
          display={value => <span> {`${value || "0"} yrs`}</span>}
          endpoint={endpoint}
          onUpdate={updatePatient}
        />
        {" / "}
        {<i className="fa fa-phone px-1" />}
        <Editable
          value={patient.phone1 || ""}
          fieldName="phone1"
          title="Edit Phone Number"
          display={value => <span> {value || "none"}</span>}
          endpoint={endpoint}
          onUpdate={updatePatient}
        />
        {" , "}
        <Editable
          value={patient.phone2 || ""}
          fieldName="phone2"
          title="Edit Alternate Phone Number"
          display={value => <span> {value || "no alt. phone"}</span>}
          endpoint={endpoint}
          onUpdate={updatePatient}
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

HelpText = connect(null, dispatch => ({
  updatePatient: patient => dispatch(updatePatientDataPatient(patient))
}))(HelpText);
export default HelpText;
