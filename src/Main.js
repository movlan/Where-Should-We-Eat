import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import SignupForm from "./components/SignupForm/SignupForm";
import userService from "./utils/userService";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
    };
  }

  setUser = (user) => {
    this.setState({
      user,
    });
  };

  componentDidMount() {
    if (!this.state.user) {
      userService.logInWithToken().then((user) => {
        this.setUser(user);
      });
    }
  }

  render() {
    return (
      <Container>
        <NavigationBar setUser={this.setUser} user={this.state.user} />
        <Container fluid>
          <Route exact path="/">
            <h1>Main</h1>
          </Route>
          <Route
            path="/login"
            render={({ history }) =>
              this.state.user ? (
                <h5>Already logged in</h5>
              ) : (
                <LoginForm history={history} setUser={this.setUser} />
              )
            }
          ></Route>
          <Route
            path="/signup"
            render={({ history }) => (
              <SignupForm history={history} setUser={this.setUser} />
            )}
          ></Route>
        </Container>
      </Container>
    );
  }
}

export default Main;
