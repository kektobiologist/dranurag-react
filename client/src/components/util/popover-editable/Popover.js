import React, { Component } from "react";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import Spinner from "../Spinner";
const Popover_ = ({
  isOpen,
  children,
  title,
  onAccept,
  target,
  toggle,
  spinnerVisible
}) => (
  <Popover placement="auto" isOpen={isOpen} target={target} toggle={toggle}>
    <PopoverHeader>{title}</PopoverHeader>
    <PopoverBody>
      <div>
        {children}
        <div className="d-flex pt-2 flex-row">
          <button className="btn btn-success mr-2" onClick={onAccept}>
            <i className="fa fa-check" />
          </button>
          <button className="btn btn-danger" onClick={toggle}>
            <i className="fa fa-times" />
          </button>
          <div className="ml-auto">
            <Spinner loading={spinnerVisible} size={3} />
          </div>
        </div>
      </div>
    </PopoverBody>
  </Popover>
);

export default Popover_;
