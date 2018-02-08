import React, { Component } from "react";
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

// react-dates initialization
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
// for bug in old browsers: https://github.com/airbnb/react-dates/issues/233#issuecomment-301107184
import "airbnb-js-shims";
import "./react-calendar-heatmap.css";

import asyncComponent from "./components/util/AsyncComponent";
import AddPatient from "./containers/AddPatient";
import Home from "./containers/Home";
import Patient from "./containers/Patient";
import Footer from "./components/util/Footer";

import Login from "./containers/Login";
import ViewVisits from "./containers/ViewVisits";
import InvoiceReports from "./containers/InvoiceReports";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {
  loginReducer,
  patientDataReducer,
  todaysVisitsReducer
} from "./reducers/reducers";
import { connect } from "react-redux";
import { changeLoginState } from "./actions/actions";

// import PatientSearch from "./containers/PatientSearch";
const AsyncPatientSearch = asyncComponent(() =>
  import("./containers/PatientSearch")
);

// import GeneratePrescription from "./containers/GeneratePrescription";
const AsyncGeneratePrescription = asyncComponent(() =>
  import("./containers/GeneratePrescription")
);

// set moment timezone here globally, will be used throughout project
// not doing this, local timezone on client will probably be india only

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  loginState: loginReducer,
  patientData: patientDataReducer,
  todaysVisits: todaysVisitsReducer
});
const store = createStore(
  reducer,
  applyMiddleware(thunk) /*, applyMiddleware(logger)*/
);

var PrivateRoute = ({ component: Component, loginState, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return loginState ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

PrivateRoute = connect(({ loginState }) => ({ loginState }))(PrivateRoute);

class App extends Component {
  render() {
    var routes = [
      { url: "/", display: "Home", exact: true, component: Home },
      { url: "/addPatient", display: "Add Patient", component: AddPatient },
      {
        url: "/patientSearch",
        display: "Patient Search",
        component: AsyncPatientSearch
      },
      {
        url: "/viewVisits",
        display: "View Visits",
        component: ViewVisits
      },
      {
        url: "/invoiceReports",
        display: "Invoice Reports",
        component: InvoiceReports
      }
      // since using switch, default urls should match to home.
    ];
    return (
      <div>
        <Provider store={store}>
          <div>
            <Router>
              <div className="container">
                <Navbar routes={routes} />
                <Switch>
                  <Route path="/login" component={Login} />
                  {routes.map(({ url, component, exact }, idx) => (
                    // TODO: PRIVATE ROUTE NOT WORKING WIHTOUT SWITCH  ? ? ? ?
                    // https://stackoverflow.com/questions/43520498/react-router-private-routes-redirect-not-working
                    <PrivateRoute
                      key={idx}
                      path={url}
                      component={component}
                      exact={exact}
                    />
                  ))}
                  <PrivateRoute path="/patient/:id" component={Patient} />
                  <PrivateRoute
                    path="/generatePrescription/:id"
                    component={AsyncGeneratePrescription}
                  />
                  {/*redirect to home page. has to be last route so doesn't override others in switch*/}
                  <Route
                    path="/"
                    exact={false}
                    render={props => <Redirect to={{ pathname: "/" }} />}
                  />
                </Switch>
              </div>
            </Router>
            <Footer />
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
