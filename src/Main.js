import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import userService from "./utils/userService";
import MainPage from "./pages/MainPage/MainPage";
import { getCurrentLatLon } from "./services/geolocation";
import { getGeocode } from "./services/zomato-api";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      location: undefined,
      localInfo: undefined,
    };
  }

  setUser = (user) => {
    this.setState({
      user,
    });
  };

  async componentDidUpdate() {}

  async componentDidMount() {
    // add user if user is logged in
    if (!this.state.user) {
      userService.logInWithToken().then((user) => {
        this.setUser(user);
      });
    }

    //get location data form browser
    getCurrentLatLon().then((location) => {
      this.setState({ location });
      getGeocode(location.lat, location.lon).then((localInfo) => {
        this.setState({ localInfo });
      });
    });
  }

  render() {
    return (
      <Container>
        <NavigationBar setUser={this.setUser} user={this.state.user} />
        <Container fluid>
          <Route exact path="/">
            <MainPage localInfo={this.state.localInfo} />
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
