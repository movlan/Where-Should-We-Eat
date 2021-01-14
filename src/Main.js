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
import { getGeocode, getRestaurantsByCityId } from "./services/zomato-api";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      city: undefined,
      restaurants: undefined,
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

    //get lat and lon
    const data = await getCurrentLatLon();

    // get local information from particularly we are looking for city_id
    const localInfo = await getGeocode(data.latitude, data.longitude);
    const restaurants = await getRestaurantsByCityId(
      localInfo.data.location.city_id
    );

    this.setState({
      city: {
        id: localInfo.data.location.city_id,
        name: localInfo.data.location.city_name,
      },
      restaurants: restaurants.restaurants,
    });
  }

  async handleCitySearch(city_id) {
    const restaurants = await getRestaurantsByCityId(city_id);

    const city = {
      id: city_id,
      name: restaurants.restaurants[0].restaurant.location.city,
    };

    this.setState({ restaurants: restaurants.restaurants, city });
  }

  handleRestaurantSearch(res_id) {
    this.props.history.push(`/restaurants/${res_id}`);
  }

  render() {
    return (
      <Container>
        <NavigationBar setUser={this.setUser} user={this.state.user} />
        <Container fluid>
          <Route exact path="/">
            <MainPage
              restaurants={this.state.restaurants}
              city={this.state.city}
              handleCitySearch={(id) => this.handleCitySearch(id)}
              handleRestaurantSearch={(id) => this.handleRestaurantSearch(id)}
            />
          </Route>
          <Route path="/login">
            {this.state.user ? (
              <h5>Already logged in</h5>
            ) : (
              <LoginPage
                history={this.props.history}
                setUser={this.setUser}
                currentPage={this.props.location.pathname}
              />
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
              user={this.state.user}
              setUser={(user) => this.setUser(user)}
            />
          </Route>
        </Container>
      </Container>
    );
  }
}

export default Main;
