import React, { Component } from "react";
import {
  Nav,
  NavItem,
  Navbar as BSNavBar,
  MenuItem,
  NavDropdown
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
class Navbar extends Component {
  render() {
    const { routes } = this.props;
    return (
      <BSNavBar collapseOnSelect fixedTop>
        <BSNavBar.Header>
          <BSNavBar.Brand>
            <LinkContainer to="/">
              <a> dranurag.in</a>
            </LinkContainer>
          </BSNavBar.Brand>
          <BSNavBar.Toggle />
        </BSNavBar.Header>
        <BSNavBar.Collapse>
          <Nav>
            {routes.map(({ url, display, exact }, idx) => (
              <LinkContainer to={url} key={idx + 1} exact={exact}>
                <NavItem eventKey={idx + 1}>{display}</NavItem>
              </LinkContainer>
            ))}
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Link Right
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link Right
            </NavItem>
          </Nav>
        </BSNavBar.Collapse>
      </BSNavBar>
    );
  }
}

export default Navbar;
