import React, { Component } from "react";

import { ListGroup, ListGroupItem } from "reactstrap";
import moment from "moment";
var PrescriptionCard = ({ idx, prescription }) => {
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

var PrescriptionsBox = ({ prescriptions, title }) => {
  return (
    <div>
      <h2 className="py-2">{title}</h2>
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

// right now both generated and scanned prescriptions look the same so same display
export var GeneratedPrescriptionsBox = props => (
  <PrescriptionsBox {...props} title="Generated Prescriptions" />
);
export var ScannedPrescriptionsBox = props => (
  <PrescriptionsBox {...props} title="Scanned Prescriptions" />
);
