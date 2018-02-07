import React, { Component } from "react";
import { Button, ButtonToolbar } from "reactstrap";
import PatientInfoBlock from "../util/PatientInfoBlock";
import { ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";

class VisitCard extends Component {
  state = {
    isMouseInside: false
  };
  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  };
  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  };
  render() {
    const { visit, onDelete } = this.props;
    const { patient } = visit;
    return (
      <div
        className="d-flex w-100 justify-content-between"
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        <PatientInfoBlock patient={patient} />

        <div className="d-flex flex-column justify-content-between">
          <div>
            {this.state.isMouseInside ? (
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={onDelete}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            ) : (
              ""
            )}
          </div>
          <div>
            <small className="text-muted">{moment(visit.date).fromNow()}</small>
          </div>
        </div>
      </div>
    );
  }
}

// wrap it in component

class VisitCardComponent extends Component {
  render() {
    const { visit } = this.props;
    return (
      <ListGroupItem key={visit._id}>
        <VisitCard {...this.props} />
      </ListGroupItem>
    );
  }
}

export default VisitCardComponent;
