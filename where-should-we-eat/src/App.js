import React, { Component } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { Switch, Route } from "react-router-dom";
import userService from "./utils/userService";
import NavBar from "./components/NavBar/NavBar";
import { getCurrentLatLon } from "./services/geolocation";
import {
  getLocationInfo,
  getLocalCategories,
  getLocalCuisines,
  getRestaurantFromCategory,
} from "./services/zomato-api";
import LocalInfo from "./components/LocalInfo/LocalInfo";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      localCategories: [],
      restaurants: [],
      removedRestaurantsList: [],
      radius: 2,
    };
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  selectCategory = async (id) => {
    const restaurants = await getRestaurantFromCategory(
      this.state.lat,
      this.state.lon,
      id
    );
    this.setState({ restaurants });
  };

  removeRestaurant = (id) => {
    let removedRestaurant = this.state.restaurants.filter(
      (restaurant) => restaurant.restaurant.id === id
    );
    let removedList = this.state.removedRestaurantsList;
    removedList.push(removedRestaurant[0]);
    let copyOfRestaurants = this.state.restaurants.filter(
      (restaurant) => restaurant.restaurant.id !== id
    );
    this.setState({
      restaurants: copyOfRestaurants,
      removedRestaurantsList: removedList,
    });
  };

  addRestaurant = (id) => {
    let addedRestaurant = this.state.removedRestaurantsList.filter(
      (restaurant) => restaurant.restaurant.id === id
    );
    let copyOfRestaurants = this.state.restaurants;
    copyOfRestaurants.push(addedRestaurant[0]);
    let copyOfRemovedRestaurants = this.state.removedRestaurantsList.filter(
      (restaurant) => restaurant.restaurant.id !== id
    );
    this.setState({
      restaurants: copyOfRestaurants,
      removedRestaurantsList: copyOfRemovedRestaurants,
    });
  };

  async componentDidMount() {
    const { lat, lon } = await getCurrentLatLon();
    const localInfo = await getLocationInfo(lat, lon);
    const localCategories = await getLocalCategories(lat, lon);
    const cuisines = await getLocalCuisines(lat, lon);
    this.setState({ lat, lon, localInfo, localCategories, cuisines });
  }

  render() {
    return (
      <div className="App">
        <h1>Where Should We Eat?</h1>
        <NavBar handleLogout={this.handleLogout} user={this.state.user} />
        <Switch>
          <Route
            exact
            path="/"
            render={({ history }) => (
              <LocalInfo
                localInfo={this.state.localInfo}
                localCategories={this.state.localCategories}
                selectCategory={this.selectCategory}
                removeRestaurant={this.removeRestaurant}
                addRestaurant={this.addRestaurant}
                restaurants={this.state.restaurants}
                removedRestaurantsList={this.state.removedRestaurantsList}
              />
            )}
          />
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
