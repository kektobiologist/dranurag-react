import React from "react";

import { Highlight } from "react-instantsearch/dom";
import { Link } from "react-router-dom";
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
