import React from "react";
import ReactDOM from "react-dom";

// First, we need to add the Hits component to our import
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  Pagination,
  Configure
} from "react-instantsearch/dom";
import { connectStateResults } from "react-instantsearch/connectors";

import { ListGroup, ListGroupItem } from "reactstrap";
// [...]
import PatientCard from "../components/PatientSearch/PatientCard";

function Search() {
  return (
    <div>
      <div style={{ margin: "auto" }}>
        <SearchBox />
      </div>
      <ListGroup className="mt-2">
        <Content />
      </ListGroup>
    </div>
  );
}

function Patient({ hit }) {
  // return <ListGroupItem key={hit._id}>{hit.name}</ListGroupItem>;
  return (
    <ListGroupItem>
      <PatientCard patient={hit} />
    </ListGroupItem>
  );
}

const Content = connectStateResults(
  ({ searchState }) =>
    searchState && searchState.query ? (
      <Hits hitComponent={Patient} />
    ) : (
      <div className="text-muted" />
    )
);

export default () => (
  <InstantSearch
    appId="1T0DWJW3ZN"
    apiKey="5ce22be0f0b05dd152bec330daa03a9b"
    indexName="patients"
  >
    <Configure hitsPerPage={15} />
    <Search />
  </InstantSearch>
);
