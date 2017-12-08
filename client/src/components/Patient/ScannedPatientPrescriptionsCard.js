import React from "react";

import { ListGroup, ListGroupItem } from "reactstrap";
import moment from "moment";

var ScannedPrescriptionCard = ({ idx, prescription }) => {
  const { url, timestamp, title } = prescription;
  return (
    <div>
      <span className="text-muted">{idx}. </span>
      <a href={url} target="_blank">
        {title}
      </a>
      <span className="text-muted pull-right">
        {moment(timestamp).fromNow()}
      </span>
    </div>
  );
};

export default ({ prescriptions }) => {
  return (
    <div>
      <h2 className="py-2">Scanned Prescriptions</h2>
      <ListGroup>
        {prescriptions.map((prescription, idx) => {
          return (
            <ListGroupItem key={idx}>
              <ScannedPrescriptionCard
                idx={idx + 1}
                prescription={prescription}
              />
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};
