import React from "react";
import moment from "moment";
import { ListGroup, ListGroupItem } from "reactstrap";
import { toCurrency } from "../util/util";

export default ({ date, amount, invoices }) => (
  <div className="card">
    <div className="card-body">
      <h3 className="card-title">
        Invoices for {moment(date).format("ddd, Do MMM 'YY")}
      </h3>
      <ListGroup>
        {invoices.map(({ _id, patient, amount }, idx) => (
          <ListGroupItem key={idx}>
            <span className="text-muted">Inv #{_id}</span>
            <span> {patient.name}</span>
            <span className="pull-right">Rs. {toCurrency(amount)}</span>
          </ListGroupItem>
        ))}
        <ListGroupItem key={"total"} color="dark">
          <span>Total:</span>
          <span className="pull-right">Rs. {toCurrency(amount)}</span>
        </ListGroupItem>
      </ListGroup>
    </div>
  </div>
);
