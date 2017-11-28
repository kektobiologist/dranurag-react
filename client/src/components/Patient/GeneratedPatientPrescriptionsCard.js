import React from "react";

import { ListGroup, ListGroupItem } from "reactstrap";
import moment from "moment";
var PrescriptionCard = ({ idx, prescriptionInfo }) => {
  const { url, timestamp, title } = prescriptionInfo;
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

export default ({ prescriptionInfos }) => {
  return (
    <div>
      <h2 className="py-2">Generated Prescriptions</h2>
      <ListGroup>
        {prescriptionInfos.map((prescriptionInfo, idx) => {
          return (
            <ListGroupItem key={idx}>
              <PrescriptionCard
                idx={idx + 1}
                prescriptionInfo={prescriptionInfo}
              />
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};
