import React from "react";

export const RestaurantsList = (props) => {
  let removedRestaurants = (
    <div className="col s12 m6">
      <div className="card">
        <div className="card-content">
          <span className="card-title">Removed Restaurants</span>
          <div className="collection">
            {props.removedRestaurantsList.map((restaurant) => (
              <p
                className="collection-item"
                key={restaurant.restaurant.id}
                onClick={() => props.addRestaurant(restaurant.restaurant.id)}
              >
                {restaurant.restaurant.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  let restaurants = (
    <div className="col s12 m6">
      <div className="card">
        <div className="card-content">
          <span className="card-title">List of restaurants</span>
          <div className="collection">
            {props.restaurants.map((restaurant) => (
              <p
                className="collection-item"
                key={restaurant.restaurant.id}
                onClick={() => props.removeRestaurant(restaurant.restaurant.id)}
              >
                {restaurant.restaurant.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="row">
      {restaurants}
      {removedRestaurants}
    </div>
  );
};
