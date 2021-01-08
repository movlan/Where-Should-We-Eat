import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import RestaurantView from "./pages/RestaurantView/RestaurantView";

import NavigationBar from "./components/NavigationBar/NavigationBar";
import userService from "./utils/userService";
import { getCurrentLatLon } from "./services/geolocation";
import { getGeocode } from "./services/zomato-api";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      locationInformation: undefined,
      localRestaurantInfo: undefined,
    };
  }

  setUser = (user) => {
    this.setState({
      user,
    });
  };

  async componentDidMount() {
    // add user if user is logged in
    if (!this.state.user) {
      const user = await userService.logInWithToken();
      this.setUser(user);
    }

    //get location data form browser
    const data = await getCurrentLatLon();
    const locationInformation = {
      lat: data.latitude,
      lon: data.longitude,
      city: data.city,
    };
    this.setState({ locationInformation });

    // get local restaurants information from
    const localRestaurants = await getGeocode(data.latitude, data.longitude);

    this.setState({ localRestaurantInfo: localRestaurants.data });
  }

  render() {
    return (
      <Container>
        <NavigationBar setUser={this.setUser} user={this.state.user} />
        <Container fluid>
          <Route exact path="/">
            <MainPage
              localRestaurantInfo={this.state.localRestaurantInfo}
              locationInformation={this.state.locationInformation}
            />
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
          <Route path="/restaurants/:id">
            <RestaurantView
              id={this.props.history.location.pathname.split("/")[2]}
            />
          </Route>
        </Container>
      </Container>
    );
  }
}

export default Main;
