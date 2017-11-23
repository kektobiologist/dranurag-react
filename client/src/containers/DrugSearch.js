import React, { Component } from "react";
import ReactDOM from "react-dom";

import { InstantSearch, Configure } from "react-instantsearch/dom";

import { ListGroup, ListGroupItem } from "reactstrap";
import { SearchInputBox, SearchBox } from "../components/DrugSearch/SearchBox";
import SelectedDrugsBox from "../components/DrugSearch/SelectedDrugsBox";

import { createStore, combineReducers } from "redux";
import { connect } from "react-redux";
import { reducer as formReducer, arrayPush } from "redux-form";
import { Provider } from "react-redux";
import { formName } from "../config/config";

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
    store.dispatch(
      arrayPush(formName, "selectedDrugs", {
        name: hit.name,
        id: hit.id,
        drugMeta: { ...hit }
      })
    );
  };

  onSubmit = values => {
    console.log(values);
  };
  render() {
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
                <SelectedDrugsBox onSubmit={this.onSubmit} />
              </div>
            </div>
          </div>
        </InstantSearch>
      </Provider>
    );
  }
}

export default DrugSearch;
