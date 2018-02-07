import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { loginFormName } from "../config/config";
import { Field, reduxForm, Form } from "redux-form";
import { withRouter } from "react-router-dom";
import {
  FormField,
  TextField,
  SelectField
} from "../components/util/FormFields";
import { changeLoginState } from "../actions/actions";
import { connect } from "react-redux";

class Login extends Component {
  // check if already logged in; if so then redirect to /
  constructor(props) {
    super(props);
    const { history, changeLoginState } = this.props;
    this.state = {
      gotLoggedInState: false
    };
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    fetch(`/api/checkLoggedIn`, { credentials: "include" })
      .then(res => res.json())
      .then(res => {
        changeLoginState(res);
        this.setState({ gotLoggedInState: true });
        if (res) history.push(from.pathname);
      });
  }

  onSubmit = values => {
    const { history, changeLoginState } = this.props;
    fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        changeLoginState(res);
        return res;
      })
      .then(() => history.push("/"));
  };
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { gotLoggedInState } = this.state;
    return gotLoggedInState ? (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          component={TextField}
          name="username"
          required={true}
          label="Username"
          placeholder="Username"
          iconName="fa-user"
          inputType="text"
        />
        <Field
          component={TextField}
          name="password"
          required={true}
          label="Password"
          placeholder="Password"
          iconName="fa-lock"
          inputType="password"
        />
        <button
          type="submit"
          className="btn btn-outline-primary"
          disabled={pristine || submitting}
        >
          Submit
        </button>
      </form>
    ) : (
      <div>Loading...</div>
    );
  }
}

Login = reduxForm({
  form: loginFormName
})(Login);

Login = withRouter(Login);

Login = connect(null, dispatch => ({
  changeLoginState: loginState => {
    dispatch(changeLoginState(loginState));
  }
}))(Login);

export default Login;
