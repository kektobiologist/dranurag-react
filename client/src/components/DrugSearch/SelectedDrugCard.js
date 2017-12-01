import React from "react";
import Autocomplete from "react-autocomplete";

import { Field, formValues } from "redux-form";

// hardcode the possible values of fields
import _ from "lodash";
import moment from "moment";
import ACField from "./ACField";
import ACFieldReactAutosuggest from "./ACFieldReactAutosuggest";

class SelectedDrugCard extends React.Component {
  state = {
    isMouseInside: false
  };
  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  };
  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  };

  render() {
    const { drug, drugMeta, onRemove } = this.props;
    return (
      <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <div className="d-flex w-100 justify-content-between">
          <div>
            <Field
              name={`${drug}.name`}
              component={({ input }) => <h5 className="mb-1">{input.value}</h5>}
            />
          </div>
          <div>
            {this.state.isMouseInside ? (
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
          </div>
        </div>

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
              list={drugMeta[key]}
              label={label}
              name={`${drug}.${name}`}
              component={ACFieldReactAutosuggest}
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
                      name={`${drug}.duration.number`}
                      type="number"
                      component="input"
                      className="form-control"
                      validate={[
                        value =>
                          isNaN(Number(value))
                            ? "Please enter a number."
                            : undefined
                      ]}
                    />
                  </div>
                  <div className="col">
                    <Field
                      name={`${drug}.duration.type`}
                      className="form-control"
                      component="select"
                    >
                      {["days", "weeks", "months", "years"].map(type => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
                    </Field>
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
