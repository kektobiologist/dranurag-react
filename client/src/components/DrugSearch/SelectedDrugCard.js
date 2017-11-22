import React from "react";
import Autocomplete from "react-autocomplete";

import { Field } from "redux-form";

// hardcode the possible values of fields
import { fieldValues } from "./DrugData";
import _ from "lodash";
import moment from "moment";
import ACField from "./ACField";

class SelectedDrugCard extends React.Component {
  state = {
    ac_values: {}
  };
  constructor(props) {
    super(props);
    const { drug } = props;
    var ac_values = {};
    var keys = ["frequencies", "dosages", "durations", "specialComments"];
    keys.forEach(str => {
      ac_values[str] = _.sortBy(
        fieldValues[str].map(val => {
          var temp;
          if ((temp = _.find(drug[str], { val: val })))
            return { val: val, count: temp.count };
          else return { val: val, count: 0 };
        }),
        [o => -o.count, o => o.val]
      );
    });
    var { durations } = ac_values;
    this.state = {
      ac_values: ac_values,
      duration: durations[0].count
        ? this.durationConverter(durations[0].val)
        : null
    };
  }
  durationConverter = str => {
    var strs = str.split(" ");
    if (strs.length < 2) {
      // weird case of '5' or empty
      return null;
    }
    return { number: parseInt(strs[0]), type: strs[1] };
  };

  render() {
    const { ac_values, duration } = this.state;
    var defaultDurationType = duration ? duration.type : "days";
    const { drug } = this.props;
    // console.log(duration);
    return (
      <div>
        <h5 className="mb-1">{drug.name}</h5>
        <div>
          {drug.composition ? (
            <small className="text-muted">{drug.composition.join(", ")}</small>
          ) : (
            <div />
          )}
        </div>
        {[
          ["frequencies", "Frequency"],
          ["dosages", "Dosage"],
          ["specialComments", "Instructions"]
        ].map(str => (
          <div key={str[0]}>
            <Field
              list={ac_values[str[0]]}
              label={str[1]}
              name={`${drug}.${str[0]}`}
              component={ACField}
            />
          </div>
        ))}
        {
          // duration field

          <div key={"duration"}>
            <div className="form-group row">
              <label className="col-form-label col-4">Duration</label>
              <div className="col-8">
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={duration ? duration["number"] : ""}
                    />
                  </div>
                  <div className="col">
                    <select
                      name="duration"
                      className="form-control"
                      defaultValue={defaultDurationType}
                    >
                      {["days", "weeks", "months", "years"].map(type => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default SelectedDrugCard;
