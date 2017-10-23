import React, { Component } from "react";
import { Row, Col, Grid } from "reactstrap";
import PatientInfoCard from "../components/Patient/PatientInfoCard";

export default class PatientWithLoad extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    // console.log(match);
    this.state = {
      data: null,
      id: match.params.id
    };
  }

  componentDidMount() {
    const { id } = this.state;
    fetch("/api/patient/" + id)
      .then(res => res.json())
      .then(data => this.setState({ data: data }));
  }

  render() {
    const { data, id } = this.state;
    return (
      <div>{data ? <PatientInfoCard patient={data} /> : "Loading..."}</div>
    );
  }
}
