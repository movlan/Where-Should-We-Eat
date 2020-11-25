import React from "react";
import {
  Navbar,
  InputGroup,
  FormControl,
  Button,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Route } from "react-router-dom";
import userService from "../../utils/userService";

const NavigationBar = (props) => {
  let userLinks = props.user ? (
    <>
      <NavDropdown title={props.user.name} id="collapsible-nav-dropdown">
        <NavDropdown.Item>
          <LinkContainer to="/profile">
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>
        </NavDropdown.Item>

        <NavDropdown.Item
          onClick={() => {
            userService.logout();
            props.setUser(undefined);
          }}
        >
          <LinkContainer to="/">
            <Nav.Link>Log Out</Nav.Link>
          </LinkContainer>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  ) : (
    <>
      <LinkContainer to="/login">
        <Nav.Link>Log In</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/signup">
        <Nav.Link>Sign Up</Nav.Link>
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
      <Route exact path="/">
        <Navbar>
          <InputGroup>
            <InputGroup.Append>
              <FormControl placeholder={"Current City"} />
            </InputGroup.Append>
            <FormControl className="mr-sm-2" placeholder="Restaurants" />
            <Button>Search</Button>
          </InputGroup>
        </Navbar>
      </Route>
    </>
  );
};

export default NavigationBar;
