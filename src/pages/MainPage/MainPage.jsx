import React from "react";
import RestaurantCardView from "../../components/RestaurantCardView/RestaurantCardView";
import SearchBar from "../../components/SearchBar/SearchBar";

const MainPage = (props) => {
  const restaurants = () => {
    return props.restaurants
      ? props.restaurants.map((restaurant) => {
          return (
            <RestaurantCardView
              restaurant={restaurant.restaurant}
              key={restaurant.restaurant.R.res_id}
            />
          );
        })
      : undefined;
  };

  return (
    <>
      <SearchBar
        city={props.city}
        handleCitySearch={(id) => props.handleCitySearch(id)}
        handleRestaurantSearch={(id) => props.handleRestaurantSearch(id)}
      />
      {restaurants()}
    </>
  );
};

export default MainPage;
