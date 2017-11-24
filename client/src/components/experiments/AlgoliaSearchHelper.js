import React, { Component } from "react";
import { ListGroupItem, ListGroup } from "reactstrap";
import algoliasearch from "algoliasearch";
import algoliasearchHelper from "algoliasearch-helper";

class Search extends Component {
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
      value: ""
    };
    helper.on("result", content => console.log(content));
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSearch = () => {
    const { value, helper } = this.state;
    // search both on algolia and medplusmart
    helper.setQuery(value).search();
    if (value.length >= 3)
      fetch(`/api/medplusmart/drugs?q=${value}`)
        .then(res => res.json())
        .then(res => console.log(res));
  };

  render() {
    const { value, helper } = this.state;
    return (
      <div>
        <input
          type="text"
          value={value}
          className="form-control"
          onChange={this.handleChange}
          onKeyUp={this.handleSearch}
        />
        <button type="button" className="btn" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
