import React, { Component } from "react";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { Row, Col } from "react-bootstrap";

import AddPatient from "./containers/AddPatient";
import Home from "./containers/Home";

class App extends Component {
  render() {
    var routes = [
      { url: "/", display: "Home", exact: true, component: Home },
      { url: "/addPatient", display: "Add Patient", component: AddPatient },
      { url: "/patientSearch", display: "Patient Search" },
      { url: "/VisitSearch", display: "Visit Search" }
    ];
    return (
      <Router>
        <div>
          <Navbar routes={routes} />
          <div className="container">
            {routes.map(({ url, component, exact }, idx) => (
              <Route key={idx} path={url} component={component} exact={exact} />
            ))}
          </div>
        </div>
      </Router>
    );
  }
}

class Gist extends Component {
  state = {
    gist: null
  };

  changeGist(nextProps) {
    fetch("https://api.github.com/gists/" + nextProps.match.params.gistId)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res;
      })
      .then(gist => this.setState({ gist }));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ gist: null });
    this.changeGist(nextProps);
  }

  componentDidMount() {
    this.changeGist(this.props);
  }

  render() {
    const { gist } = this.state;
    return gist ? (
      <div>{gist.description || "[no descripoton]"}</div>
    ) : (
      <div>Loading..</div>
    );
  }
}

export default App;
