import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import VisitCard from "../components/Home/VisitCard";

class Home extends Component {
  state = {
    visits: null
  };

  updateVisits() {
    fetch("/api/visits", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => res.filter(({ patient }) => patient))
      .then(visits => this.setState({ visits }));
  }

  componentDidMount() {
    this.updateVisits();
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    const { visits } = this.state;
    return (
      <div>
        <h3 className="py-2">Today's Visits:</h3>
        <ListGroup>
          {visits ? (
            visits.map((visit, idx) => (
              <VisitCard key={visit._id} visit={visit} />
            ))
          ) : (
            <div> Loading...</div>
          )}
        </ListGroup>
      </div>
    );
  }
}

export default Home;
