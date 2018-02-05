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
import "./react-calendar-heatmap.css";

import AddPatient from "./containers/AddPatient";
import Home from "./containers/Home";
import Patient from "./containers/Patient";
import PatientSearch from "./containers/PatientSearch";
import DrugSearch from "./containers/DrugSearch";
import Footer from "./components/util/Footer";
import GeneratePrescription from "./containers/GeneratePrescription";
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

// set moment timezone here globally, will be used throughout project
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Kolkata");

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
        component: PatientSearch
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
      /*{
        url: "/drugSearch",
        display: "Drug Search",
        component: DrugSearch
      },*/
      /*{ url: "/VisitSearch", display: "Visit Search" }*/
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
                    component={GeneratePrescription}
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
