import React, { Component } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { Switch, Route } from "react-router-dom";
import userService from "./utils/userService";
import NavBar from "./components/NavBar/NavBar";
import { getCurrentLatLng } from "./services/geolocation";
import { getLocationInfo } from "./services/zomato-api";
import LocalInfo from "./components/LocalInfo/LocalInfo";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
    };
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  async componentDidMount() {
    const { lat, lon } = await getCurrentLatLng();
    const locInfo = await getLocationInfo(lat, lon);
    this.setState({ locInfo });
  }

  render() {
    return (
      <div className="App">
        <h1>Where Should We Eat?</h1>
        <NavBar handleLogout={this.handleLogout} user={this.state.user} />
        <LocalInfo locInfo={this.state.locInfo} />
        <Switch>
          <Route
            exact
            path="/login"
            render={({ history }) => (
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <SignupPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
