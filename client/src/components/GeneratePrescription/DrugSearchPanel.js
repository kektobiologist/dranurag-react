import React, { Component } from "react";

import { SearchInputBox, SearchBox } from "../DrugSearch/SearchBox";
import MultiSearchBox from "../DrugSearch/MultiSearchBox";
import SelectedDrugsBox from "../DrugSearch/SelectedDrugsBox";

import { connect } from "react-redux";
import { arrayInsert } from "redux-form";
import { formName } from "../../config/config";
import getDrugItem from "../util/DrugACFormatter";

class DrugSearchPanel extends Component {
  onSubmit = values => {
    console.log(values);
  };
  render() {
    return (
      <div className="row">
        <div className="col">
          {/*<SearchBox onDrugClicked={this.props.onDrugClicked} />*/}
          <MultiSearchBox onDrugClicked={this.props.onDrugClicked} />
        </div>
        <div className="col">
          <SelectedDrugsBox onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

// connecting to the global store
DrugSearchPanel = connect(null, dispatch => ({
  onDrugClicked: hit => {
    dispatch(arrayInsert(formName, "selectedDrugs", 0, getDrugItem(hit)));
  }
}))(DrugSearchPanel);

export default DrugSearchPanel;
