import React from "react";
import HelpText from "./HelpText";
import { Link } from "react-router-dom";

export default ({ patient }) => (
  <div>
    <h5 className="mb-1">
      <Link to={"/patient/" + patient._id} className="">
        {patient.name}
      </Link>
    </h5>
    <p className="mb-1">{"ID: " + patient._id}</p>
    <small>
      <HelpText patient={patient} />
    </small>
  </div>
);
