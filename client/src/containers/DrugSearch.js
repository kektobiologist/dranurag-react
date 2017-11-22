import React, { Component } from "react";
import ReactDOM from "react-dom";

import { InstantSearch, Configure } from "react-instantsearch/dom";

import { ListGroup, ListGroupItem } from "reactstrap";
import { SearchInputBox, SearchBox } from "../components/DrugSearch/SearchBox";
import SelectedDrugsBox from "../components/DrugSearch/SelectedDrugsBox";

import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
});

const store = createStore(rootReducer);

class DrugSearch extends Component {
  state = {
    selectedDrugs: [],
    counter: 1
  };

  onDrugClicked = hit => {
    const { selectedDrugs, counter } = this.state;
    this.setState({
      selectedDrugs: [...selectedDrugs, { ...hit, idx: counter }],
      counter: counter + 1
    });
  };

  onSubmit = values => {
    console.log(values);
  };
  render() {
    const { selectedDrugs } = this.state;
    return (
      <Provider store={store}>
        <InstantSearch
          appId="1T0DWJW3ZN"
          apiKey="5ce22be0f0b05dd152bec330daa03a9b"
          indexName="drugs"
        >
          <Configure hitsPerPage={15} />
          <div>
            <SearchInputBox />
            <div className="row">
              <div className="col">
                <SearchBox onDrugClicked={this.onDrugClicked} />
              </div>
              <div className="col">
                <SelectedDrugsBox
                  selectedDrugs={selectedDrugs}
                  onSubmit={this.onSubmit}
                />
              </div>
            </div>
          </div>
        </InstantSearch>
      </Provider>
    );
  }
}

export default DrugSearch;
