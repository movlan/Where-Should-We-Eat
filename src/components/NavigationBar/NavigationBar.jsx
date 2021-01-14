import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import userService from "../../utils/userService";

const NavigationBar = (props) => {
  let userLinks = props.user ? (
    <>
      <NavDropdown title={props.user.name} id="collapsible-nav-dropdown">
        <NavDropdown.Item>
          <LinkContainer to="/profile">
            <Nav.Item>Profile</Nav.Item>
          </LinkContainer>
        </NavDropdown.Item>

        <NavDropdown.Item
          onClick={() => {
            userService.logout();
            props.setUser(undefined);
          }}
        >
          <LinkContainer to="/">
            <Nav.Item>Logout</Nav.Item>
          </LinkContainer>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  ) : (
    <>
      <LinkContainer to="/login">
        <Nav.Link>Login</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/signup">
        <Nav.Link>Signup</Nav.Link>
      </LinkContainer>
    </>
  );

  return (
    <>
      <Navbar expand="md">
        <LinkContainer to="/">
          <Navbar.Brand>Where Should We Eat</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">{userLinks}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavigationBar;
