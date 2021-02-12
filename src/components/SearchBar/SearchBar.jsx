import React from "react";
import { InputGroup, Button } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { getSearchCity, getSearchRestaurant } from "../../services/zomato-api";

class SearchBar extends React.Component {
  state = {
    isCityLoading: false,
    isRestaurantLoading: false,
    cityOptions: [],
    restaurantOptions: [],
  };

  city = () => {
    return this.props.city ? this.props.city.name : "City";
  };

  render() {
    return (
      <InputGroup className="mt-5">
        <InputGroup.Append>
          <AsyncTypeahead
            id="Search Cities"
            onChange={(selected) => {
              if (selected[0]) this.props.handleCitySearch(selected[0].id);
            }}
            placeholder={this.city()}
            isLoading={this.state.isCityLoading}
            labelKey={(option) => `${option.name}`}
            onSearch={(query) => {
              this.setState({ isLoading: true });
              getSearchCity(query).then((resp) => {
                this.setState({
                  isCityLoading: false,
                  cityOptions: resp,
                });
              });
            }}
            options={this.state.cityOptions}
          />
        </InputGroup.Append>
        <AsyncTypeahead
          className="mr-sm-2"
          style={{ flex: "1 1 auto" }}
          placeholder="Restaurants"
          id="Search Restaurants"
          onChange={(selected) => {
            if (selected[0].restaurant.R.res_id)
              this.props.handleRestaurantSearch(
                selected[0].restaurant.R.res_id
              );
          }}
          isLoading={this.state.isRestaurantLoading}
          labelKey={(option) => `${option.restaurant.name}`}
          onSearch={(query) => {
            this.setState({ isLoading: true });
            getSearchRestaurant(this.props.city.id, query).then((resp) => {
              this.setState({
                isRestaurantLoading: false,
                restaurantOptions: resp,
              });
            });
          }}
          options={this.state.restaurantOptions}
        />
        <Button>Search</Button>
      </InputGroup>
    );
  }
}

export default SearchBar;
