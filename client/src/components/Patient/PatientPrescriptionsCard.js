import React from "react";

import { ListGroup, ListGroupItem } from "reactstrap";

var PrescriptionCard = ({ idx, prescription }) => {
  const { url, timestamp, title } = prescription;
  return (
    <div>
      <span className="text-muted">{idx}. </span>
      <a href={url}>{title}</a>
    </div>
  );
};

export default ({ prescriptions }) => {
  return (
    <div>
      <h2 className="py-2">Prescriptions</h2>
      <ListGroup>
        {prescriptions.map((prescription, idx) => {
          return (
            <ListGroupItem key={idx}>
              <PrescriptionCard idx={idx + 1} prescription={prescription} />
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};
