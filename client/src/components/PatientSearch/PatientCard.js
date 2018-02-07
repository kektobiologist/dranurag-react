import React from "react";

import { Highlight } from "react-instantsearch/dom";
import { Link, withRouter } from "react-router-dom";
import HelpText from "../util/HelpText";
var PatientCard = ({ patient, history }) => {
  return (
    <div className="row justify-content-between">
      <div className="col">
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
      <div className="col text-right align-self-center">
        <a
          role="button"
          className="btn btn-outline-primary"
          href="#"
          onClick={() => {
            fetch(`/api/visit/add/${patient._id}`, { credentials: "include" })
              .then(res => res.json())
              .catch(err => console.log(err))
              .then(res => history.push("/"));
          }}
        >
          Add Visit
        </a>
      </div>
    </div>
  );
};

PatientCard = withRouter(PatientCard);

export default PatientCard;
