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

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
});

const store = createStore(rootReducer);

class DrugSearch extends Component {
  // dispatching add drug action directly using the store; should probably connect
  // DrugSearch with store using connect()?
  onDrugClicked = hit => {
    store.dispatch(arrayInsert(formName, "selectedDrugs", 0, getDrugItem(hit)));
  };

  onSubmit = values => {
    console.log(values);
  };
  render() {
    return (
      <Provider store={store}>
        <div className="row">
          <div className="col">
            {/*<SearchBox onDrugClicked={this.onDrugClicked} />*/}
            <MultiSearchBox onDrugClicked={this.onDrugClicked} />
          </div>
          <div className="col">
            <SelectedDrugsBox onSubmit={this.onSubmit} />
          </div>
        </div>
      </Provider>
    );
  }
}

export default DrugSearch;
