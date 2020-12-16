import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
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
          <Route path="/login">
            {this.state.user ? (
              <h5>Already logged in</h5>
            ) : (
              <LoginPage history={this.props.history} setUser={this.setUser} />
            )}
          </Route>
          <Route path="/signup">
            <SignupPage history={this.props.history} setUser={this.setUser} />
          </Route>
          <Route path="/profile">
            {this.state.user ? (
              <ProfilePage user={this.state.user} />
            ) : (
              <h5>You must be logged in to view profile</h5>
            )}
          </Route>
          <Route path="/edit-profile">
            {this.state.user ? (
              <EditProfilePage
                user={this.state.user}
                setUser={this.setUser}
                history={this.props.history}
              />
            ) : (
              <h5>You must be logged in to edit profile</h5>
            )}
          </Route>
        </Container>
      </Container>
    );
  }
}

export default Main;
