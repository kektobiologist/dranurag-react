import React, { Component } from "react";
import ReactDOM from "react-dom";

import { InstantSearch, Configure } from "react-instantsearch/dom";

import { ListGroup, ListGroupItem } from "reactstrap";
import { SearchInputBox, SearchBox } from "../components/DrugSearch/SearchBox";
import MultiSearchBox from "../components/DrugSearch/MultiSearchBox";
import SelectedDrugsBox from "../components/DrugSearch/SelectedDrugsBox";

import { createStore, combineReducers } from "redux";
import { connect } from "react-redux";
import { reducer as formReducer, arrayInsert } from "redux-form";
import { Provider } from "react-redux";
import { formName } from "../config/config";
import getDrugItem from "../components/util/DrugACFormatter";

class DrugSearch extends Component {
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
DrugSearch = connect(null, dispatch => ({
  onDrugClicked: hit => {
    dispatch(arrayInsert(formName, "selectedDrugs", 0, getDrugItem(hit)));
  }
}))(DrugSearch);

export default DrugSearch;
