import React, { Component } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import userService from "../../utils/userService";

class EditProfileCard extends Component {
  state = {
    name: this.props.user.name,
    email: this.props.user.email,
    password: "",
    passwordConfirmation: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = { name: this.state.name, email: this.state.email };
      if (
        this.state.password !== "" &&
        this.state.passwordConfirmation !== ""
      ) {
        updateData.password = this.state.password;
      }
      const user = await userService.update(updateData);
      this.props.setUser(user);
      this.props.history.push("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  isFormInvalid() {
    return !(
      this.state.name &&
      this.state.email &&
      (this.state.password === "" ||
        this.state.password === this.state.passwordConfirmation)
    );
  }

  render() {
    return (
      <Col md={8} className="mx-auto mt-5">
        <Card>
          <Card.Body>
            <Card.Title>Edit Profile</Card.Title>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={this.state.name}
                  name="name"
                  onChange={this.handleChange}
                />
              </Form.Group>
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
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={this.state.passwordConfirmation}
                  name="passwordConfirmation"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                className="btn"
                disabled={this.isFormInvalid()}
                type="submit"
              >
                Save
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

export default EditProfileCard;
