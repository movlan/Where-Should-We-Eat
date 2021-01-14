import React, { Component } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import userService from "../../utils/userService";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await userService.login(this.state);
      this.props.setUser(user);
      this.props.history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  isFormInvalid() {
    return !(this.state.email && this.state.password !== "");
  }

  render() {
    return (
      <Col md={8} className="mx-auto mt-5">
        <Card>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  name="email"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  autoComplete="on"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Button
                className="btn"
                disabled={this.isFormInvalid()}
                type="submit"
              >
                Login
              </Button>

              <LinkContainer to="/">
                <Button variant="danger" className="ml-2">
                  Cancel
                </Button>
              </LinkContainer>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default LoginForm;
