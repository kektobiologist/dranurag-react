import React, { Component } from "react";
import ReactDOM from "react-dom";

// First, we need to add the Hits component to our import
import {
  InstantSearch,
  Hits,
  SearchBox as SearchInputAlgolia,
  Highlight,
  Pagination,
  Configure
} from "react-instantsearch/dom";
import {
  connectStateResults,
  connectHits
} from "react-instantsearch/connectors";

import { ListGroup, ListGroupItem } from "reactstrap";
// [...]
import DrugCard from "./DrugCard";

export var SearchInputBox = () => (
  <div style={{ margin: "auto" }}>
    <SearchInputAlgolia />
  </div>
);

export function SearchBox({ onDrugClicked }) {
  return (
    <ListGroup className="mt-2">
      <CustomHits onDrugClicked={onDrugClicked} />
    </ListGroup>
  );
}

var Drug = ({ hit, onDrugClicked }) => {
  return (
    <ListGroupItem onClick={onDrugClicked}>
      <DrugCard drug={hit} />
    </ListGroupItem>
  );
};

const CustomHits = connectHits(({ hits, onDrugClicked }) => {
  return (
    <div>
      {hits.map((hit, idx) => (
        <Drug
          hit={hit}
          key={hit.objectID}
          onDrugClicked={() => onDrugClicked(hit)}
        />
      ))}
    </div>
  );
});

const Content = connectStateResults(({ searchState, onDrugClicked, props }) => {
  return searchState && searchState.query ? (
    <Hits hitComponent={Drug} />
  ) : (
    <div className="text-muted" />
  );
});
