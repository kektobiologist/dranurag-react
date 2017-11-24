import React from "react";

import { Highlight } from "react-instantsearch/dom";
import { Link } from "react-router-dom";

// for SearchBox; probably should name it instead of default export?
export default ({ drug }) => {
  return (
    <div>
      <h5 className="mb-1">
        <Highlight attributeName="name" hit={drug} />
      </h5>
      <div>
        {drug.composition ? (
          <small className="text-muted">{drug.composition.join(", ")}</small>
        ) : (
          <div />
        )}
      </div>
      <div>
        {drug.used_for ? (
          <small className="text-muted">{drug.used_for.join(", ")}</small>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

// this one is for MultiSearchBox
export var DrugCard = ({ drug }) => (
  <div>
    <div className="row justify-content-between">
      <h5 className="col-auto">
        {drug._highlightResult ? (
          <div
            dangerouslySetInnerHTML={{
              __html: drug._highlightResult.name.value
            }}
          />
        ) : (
          `${drug.name}`
        )}
      </h5>
      <div className="col text-right">
        {drug.composition ? (
          <small className="text-muted">{drug.composition.join(", ")}</small>
        ) : (
          <div />
        )}
      </div>
    </div>
  </div>
);
