import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import HelpText from "../util/HelpText";

import { Link } from "react-router-dom";

var VisitCard = ({ visit }) => {
  // return <div>{visit.patient ? visit.patient._id : "null"}</div>;
  const { patient } = visit;
  return (
    <div className="d-flex w-100 justify-content-between">
      <div>
        <h5 className="mb-1">{patient.name}</h5>
        <p className="mb-1">{"ID: " + patient._id}</p>
        <HelpText patient={patient} />
      </div>
      <div>
        <div className="pb-2">
          <a
            className="btn btn-outline-primary col"
            href="prescription.app://<%=e.patient._id%>"
          >
            Upload Prescription
          </a>
        </div>
        <div className="pt-2">
          <Link
            to={"/patient/" + patient._id}
            className="btn btn-outline-primary col"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VisitCard;
