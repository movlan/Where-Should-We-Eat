import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { LocalInfo } from "./components/LocalInfo/LocalInfo";
import { LocalCategories } from "./components/LocalCategories/LocalCategories";
import { RestaurantsList } from "./components/RestaurantsList/RestaurantsList";
import { LocalEstablishments } from "./components/LocalEstablishments/LocalEstablishments";
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      localCategories: [],
      restaurants: [],
      removedRestaurantsList: [],
      establishments: [],
      cuisines: [],
      establishmentId: null,
      categoryId: null,
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
    this.setState({ categoryId: id }, () => this.searchRestaurants());
  };

  selectEstablishment = async (id) => {
    this.setState({ establishmentId: id }, () => this.searchRestaurants());
  };

  searchRestaurants = async () => {
    const restaurants = await getSearch(
      this.state.lat,
      this.state.lon,
      this.state.establishmentId,
      this.state.categoryId
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
    let sidenav = document.querySelector(".sidenav");
    M.Sidenav.init(sidenav, {});
    const { lat, lon } = await getCurrentLatLon();
    const localInfo = await getGeocode(lat, lon);
    const localCategories = await getCategories(lat, lon);
    const establishments = await getEstablishments(lat, lon);
    const cuisines = await getCuisines(lat, lon);
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
        <NavBar handleLogout={this.handleLogout} user={this.state.user} />
        <Switch>
          <Route
            exact
            path="/"
            render={({ history }) => (
              <div className="container">
                <div className="row">
                  <LocalInfo localInfo={this.state.localInfo} />
                  <LocalCategories
                    categoryId={this.state.categoryId}
                    localCategories={this.state.localCategories}
                    selectCategory={this.selectCategory}
                    restaurants={this.state.restaurants}
                  />
                  <LocalEstablishments
                    establishmentId={this.state.establishmentId}
                    localEstablishments={this.state.establishments}
                    selectEstablishment={this.selectEstablishment}
                    restaurants={this.state.restaurants}
                  />
                </div>
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
              <div className="container">
                <LoginPage
                  history={history}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                />
              </div>
            )}
          />
          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <div className="container">
                <SignupPage
                  history={history}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
