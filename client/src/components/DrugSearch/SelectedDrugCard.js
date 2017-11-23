import React from "react";
import Autocomplete from "react-autocomplete";

import { Field, formValues } from "redux-form";

// hardcode the possible values of fields
import { fieldValues } from "./DrugData";
import _ from "lodash";
import moment from "moment";
import ACField from "./ACField";

class SelectedDrugCard extends React.Component {
  state = {
    ac_values: {},
    isMouseInside: false
  };
  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  };
  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  };
  constructor(props) {
    super(props);
    const { drug, drugMeta } = props;
    var ac_values = {};
    var keys = ["frequencies", "dosages", "durations", "specialComments"];
    keys.forEach(str => {
      ac_values[str] = _.sortBy(
        fieldValues[str].map(val => {
          var temp;
          if ((temp = _.find(drugMeta[str], { val: val })))
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
    const { ac_values, duration, isMouseInside } = this.state;
    var defaultDurationType = duration ? duration.type : "days";
    const { drug, drugMeta, onRemove } = this.props;
    return (
      <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <Field
          name={`${drug}.name`}
          component={({ input }) => <h5 className="mb-1">{input.value}</h5>}
        />
        {isMouseInside ? (
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={onRemove}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        ) : (
          ""
        )}
        <div>
          {drugMeta.composition ? (
            <small className="text-muted">
              {drugMeta.composition.join(", ")}
            </small>
          ) : (
            <div />
          )}
        </div>
        {[
          ["frequencies", "Frequency", "frequency"],
          ["dosages", "Dosage", "dosage"],
          ["specialComments", "Instructions", "specialComments"]
        ].map(([key, label, name]) => (
          <div key={key}>
            <Field
              list={ac_values[key]}
              label={label}
              name={`${drug}.${name}`}
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
                    <Field
                      name={`${drug}.durationNumber`}
                      type="text"
                      component="input"
                      className="form-control"
                      /*value={duration ? duration["number"] : ""}*/
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
