import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import VisitCard from "../components/Home/VisitCard";

class Home extends Component {
  state = {
    visits: null
  };

  updateVisits() {
    fetch("/api/visits")
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
      <Row>
        <Col>Home Page!</Col>
        <ListGroup>
          {visits ? (
            visits.map((visit, idx) => (
              <ListGroupItem key={idx}>
                <VisitCard visit={visit} />
              </ListGroupItem>
            ))
          ) : (
            <div> Loading...</div>
          )}
        </ListGroup>
      </Row>
    );
  }
}

export default Home;
