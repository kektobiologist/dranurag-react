// search box with results from multiple sources
import React, { Component } from "react";
import ReactDOM from "react-dom";

import algoliasearch from "algoliasearch";
import algoliasearchHelper from "algoliasearch-helper";

import { ListGroup, ListGroupItem } from "reactstrap";
// [...]
import { DrugCard } from "./DrugCard";
import ReactSearchBar from "react-search-bar";

class MultiSearchBox extends Component {
  constructor(props) {
    super(props);
    var client = algoliasearch(
      "1T0DWJW3ZN",
      "5ce22be0f0b05dd152bec330daa03a9b"
    );
    var helper = algoliasearchHelper(client, "drugs");
    this.state = {
      client: client,
      helper: helper,
      value: "",
      algoliaResults: { hits: [] },
      medplusmartResults: { drugs: [] }
    };
    helper.on("result", content => this.setState({ algoliaResults: content }));
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
    this.handleSearch(e.target.value);
  };

  handleSearch = value => {
    const { helper } = this.state;
    // search both on algolia and medplusmart
    helper.setQuery(value).search();
    if (value.length >= 3)
      fetch(`/api/medplusmart/drugs?q=${value}`)
        .then(res => res.json())
        .then(res => this.setState({ medplusmartResults: res }));
    else this.setState({ medplusmartResults: { drugs: [] } });
  };

  render() {
    const { value, helper, algoliaResults, medplusmartResults } = this.state;
    const { onDrugClicked } = this.props;
    return (
      <div>
        <div>
          <div className="pb-2">
            <input
              ref={input => (this.searchInput = input)}
              autoFocus
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={this.handleChange}
              value={value}
            />
          </div>
          {value ? (
            <button
              type="button"
              className="close"
              aria-label="Close"
              style={{
                display: "inline",
                position: "absolute",
                top: "7px",
                right: "25px"
              }}
              onClick={() => {
                this.setState({ value: "" });
                // stupid fucking hack
                this.handleSearch("");
                this.searchInput.focus();
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          ) : (
            ""
          )}
        </div>
        <ResultsList
          onDrugClicked={onDrugClicked}
          algoliaResults={algoliaResults}
          medplusmartResults={medplusmartResults}
        />
      </div>
    );
  }
}

var ResultsList = ({ algoliaResults, medplusmartResults, onDrugClicked }) => {
  return (
    <div>
      <ListGroup>
        {algoliaResults.hits.map((hit, idx) => (
          <ListGroupItem key={idx} onClick={() => onDrugClicked(hit)}>
            <DrugCard drug={hit} />
          </ListGroupItem>
        ))}
      </ListGroup>
      <ListGroup>
        {medplusmartResults.drugs.map((hit, idx) => (
          <ListGroupItem key={idx} onClick={() => onDrugClicked(hit)}>
            <DrugCard drug={hit} />
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default MultiSearchBox;
