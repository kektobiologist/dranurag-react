import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
var VisitCard = ({ visit }) => {
  console.log(visit);
  // return <div>{visit.patient ? visit.patient._id : "null"}</div>;
  return (
    <div className="d-flex w-100 justify-content-between">
      <div>
        <h5 className="mb-1">{visit.patient.name}</h5>
        <p className="mb-1">ID: {visit.patient._id}</p>
        <small>{visit.helpText}</small>
      </div>
      <div>
        <ButtonToolbar>
          <Button
            bsStyle="default"
            href={"prescription.app://" + visit.patient._id}
          >
            Upload Prescription
          </Button>

          <Button bsStyle="default" href={"/patient/" + visit.patient._id}>
            Add Visit
          </Button>
          <button
            type="button"
            className="btn btn-default"
            aria-label="Left Align"
          >
            <span
              className="glyphicon glyphicon-align-left"
              aria-hidden="true"
            />
          </button>
        </ButtonToolbar>
      </div>
    </div>
  );
};

export default VisitCard;
