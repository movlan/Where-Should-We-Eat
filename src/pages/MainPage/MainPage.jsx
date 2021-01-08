import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import RestaurantCardView from "../../components/RestaurantCardView/RestaurantCardView";

const MainPage = (props) => {
  const restaurants = () => {
    return props.localRestaurantInfo
      ? props.localRestaurantInfo.nearby_restaurants.map((restaurant) => {
          return (
            <RestaurantCardView
              restaurant={restaurant.restaurant}
              key={restaurant.restaurant.R.res_id}
            />
          );
        })
      : undefined;
  };

  const city = () => {
    return props.locationInformation
      ? props.locationInformation.city
      : undefined;
  };

  return (
    <>
      <InputGroup className="mt-5">
        <InputGroup.Append>
          <FormControl defaultValue={city()}></FormControl>
        </InputGroup.Append>
        <FormControl className="mr-sm-2" placeholder="Restaurants" />
        <Button>Search</Button>
      </InputGroup>
      {restaurants()}
    </>
  );
};

export default MainPage;
