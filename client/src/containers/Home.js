import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import VisitCard from "../components/Home/VisitCard";
import Spinner from "../components/util/Spinner";

class Home extends Component {
  state = {
    visits: null,
    loading: false
  };

  updateVisits() {
    this.setState({ loading: true, visits: null });
    fetch("/api/visits", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => res.filter(({ patient }) => patient))
      .then(visits => this.setState({ visits }))
      .then(() => this.setState({ loading: false }));
  }

  onRefresh = () => {
    this.updateVisits();
  };
  componentDidMount() {
    this.updateVisits();
  }

  render() {
    const { visits, loading } = this.state;
    return (
      <div>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <h3 className="py-2">Today's Visits:</h3>
            <div className="pl-2 py-2 my-2 align-self-end">
              <Spinner loading={loading} size={10} />
            </div>
          </div>
          <div className="align-self-center">
            <button
              type="button"
              href="#"
              className="btn btn-outline-primary"
              onClick={this.onRefresh}
            >
              Refresh
            </button>
          </div>
        </div>
        <ListGroup>
          {visits
            ? visits.map((visit, idx) => (
                <VisitCard key={visit._id} visit={visit} />
              ))
            : ""}
        </ListGroup>
      </div>
    );
  }
}

export default Home;
