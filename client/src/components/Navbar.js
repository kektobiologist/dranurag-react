import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar as BSNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { changeLoginState } from "../actions/actions";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  onNavItemClicked = () => {
    this.setState({ isOpen: false });
  };

  handleLogout = () => {
    const { history, changeLoginState } = this.props;
    fetch(`/api/logout`, { credentials: "include" })
      .then(res => res.json())
      // res should always be false since we are logging out
      .then(res => changeLoginState(res))
      .then(() => history.push("/"));
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { routes, loginState } = this.props;
    return (
      <div>
        <BSNavbar className="fixed-top navbar-light bg-light" expand="md">
          <NavbarBrand href="/">dranurag.in</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              {routes.map((r, idx) => (
                <NavItem key={idx}>
                  <LinkContainer to={r.url} exact={r.exact}>
                    <NavLink onClick={this.onNavItemClicked}>
                      {r.display}
                    </NavLink>
                  </LinkContainer>
                </NavItem>
              ))}
            </Nav>
            <Nav className="ml-auto" navbar>
              {loginState ? (
                <button
                  role="button"
                  className="btn btn-outline-primary"
                  href="#"
                  onClick={this.handleLogout}
                >
                  Logout
                </button>
              ) : (
                ""
              )}
            </Nav>
          </Collapse>
        </BSNavbar>
      </div>
    );
  }
}

Navbar = connect(
  ({ loginState }) => ({ loginState }),
  dispatch => ({
    changeLoginState: loginState => dispatch(changeLoginState(loginState))
  })
)(Navbar);
Navbar = withRouter(Navbar);
export default Navbar;
