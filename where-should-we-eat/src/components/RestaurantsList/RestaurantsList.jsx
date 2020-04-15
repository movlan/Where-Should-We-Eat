import React from "react";

export const RestaurantsList = (props) => {
  let removedRestaurants =
    props.removedRestaurantsList.length > 0 ? (
      <div>
        <h2>List of Removed RestaurantsList</h2>
        <ul style={{ listStyleType: "none" }}>
          {props.removedRestaurantsList.map((restaurant) => (
            <li
              key={restaurant.restaurant.id}
              onClick={() => props.addRestaurant(restaurant.restaurant.id)}
            >
              {restaurant.restaurant.name}
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  let restaurants =
    props.restaurants.length > 0 ? (
      <div>
        <h2>List of restaurants</h2>
        <ul style={{ listStyleType: "none" }}>
          {props.restaurants.map((restaurant) => (
            <li
              key={restaurant.restaurant.id}
              onClick={() => props.removeRestaurant(restaurant.restaurant.id)}
            >
              {restaurant.restaurant.name}
            </li>
          ))}
        </ul>
      </div>
    ) : null;
  return (
    <div>
      {restaurants}
      {removedRestaurants}
    </div>
  );
};
