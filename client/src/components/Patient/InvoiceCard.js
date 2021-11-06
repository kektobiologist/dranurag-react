
import { toCurrency } from "../util/util";
import React from 'react';
import moment from 'moment';

var InvoiceCard = ({ invoice, onDelete, onEmail, emailDisabled = false }) => {
  const { _id, date, amount, paymentMode = 'CASH' } = invoice;
  return (
    <div>
      <a href={`/api/invoice/pdf/${_id}`} target="_blank">
        <span className="text-muted">#{_id}. </span>
        <span>Rs. {toCurrency(amount)}</span>
      </a>
      <span className='text-muted pl-3'>{paymentMode}</span>
      <span className="text-muted pull-right">
        <span>
            <button
              className="btn btn-outline-primary mr-2 btn-sm"
              type="button"
              onClick={() => onEmail(invoice._id)}
              disabled={emailDisabled}
              >
            Email
          </button>
        </span>
        {`${moment(date).format("D MMM 'YY")}`}
        <button
          type="button"
          className="close ml-3"
          aria-label="Close"
          onClick={() => onDelete(_id)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </span>
    </div>
  );
};

export default InvoiceCard;