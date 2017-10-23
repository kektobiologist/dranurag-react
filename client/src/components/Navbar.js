import React, { Component } from "react";
import { Link } from "react-router-dom";
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

export default class Example extends React.Component {
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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { routes } = this.props;
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
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  Github
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </BSNavbar>
      </div>
    );
  }
}
