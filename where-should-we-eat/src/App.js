import React, { Component } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { Switch, Route } from "react-router-dom";
import userService from "./utils/userService";
import NavBar from "./components/NavBar/NavBar";
import { getCurrentLatLon } from "./services/geolocation";
import {
  getGeocode,
  getCategories,
  getCuisines,
  getSearch,
  getEstablishments,
} from "./services/zomato-api";
import LocalInfo from "./components/LocalInfo/LocalInfo";
import { LocalCategories } from "./components/LocalCategories/LocalCategories";
import { RestaurantsList } from "./components/RestaurantsList/RestaurantsList";
import DistancePicker from "./components/DistancePicker/DistancePicker";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      localCategories: [],
      restaurants: [],
      removedRestaurantsList: [],
      establishments: [],
      radius: 4000,
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
    const restaurants = await getSearch(
      this.state.lat,
      this.state.lon,
      this.state.radius,
      id
    );
    this.setState({ restaurants });
  };

  removeRestaurant = (id) => {
    if (this.state.restaurants.length > 1) {
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
    }
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
    const localInfo = await getGeocode(lat, lon);
    const localCategories = await getCategories(lat, lon);
    const cuisines = await getCuisines(lat, lon);
    const establishments = await getEstablishments(lat, lon);
    this.setState({
      lat,
      lon,
      localInfo,
      localCategories,
      cuisines,
      establishments,
    });
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
              <div>
                <LocalInfo localInfo={this.state.localInfo} />
                <DistancePicker changeSearchRadius={this.changeSearchRadius} />
                <LocalCategories
                  localCategories={this.state.localCategories}
                  selectCategory={this.selectCategory}
                  restaurants={this.state.restaurants}
                />
                <RestaurantsList
                  restaurants={this.state.restaurants}
                  removedRestaurantsList={this.state.removedRestaurantsList}
                  removeRestaurant={this.removeRestaurant}
                  addRestaurant={this.addRestaurant}
                />
              </div>
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
