import React from "react";

import { Highlight } from "react-instantsearch/dom";
import { Link } from "react-router-dom";
import HelpText from "../util/HelpText";
export default ({ patient }) => {
  return (
    <div>
      <h5 className="mb-1">
        <Link to={"/patient/" + patient._id} className="">
          <Highlight attributeName="name" hit={patient} />
        </Link>
      </h5>
      <p className="mb-1">
        {"ID: "} {patient._id}
      </p>
      <small>
        <HelpText
          patient={{
            ...patient,
            phone1: <Highlight attributeName="phone1" hit={patient} />
          }}
        />
      </small>
    </div>
  );
};
