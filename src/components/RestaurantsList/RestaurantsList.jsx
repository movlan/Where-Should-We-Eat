import React from "react";
import CollectionRestaurantView from "../CollectionRestaurantView/CollectionRestaurantView";

export const RestaurantsList = (props) => {
  let removedRestaurants = (
    <div className="col s12 m6">
      <div className="card">
        <div className="card-content">
          <span className="card-title">Removed Restaurants</span>
          <ul className="collection">
            {props.removedRestaurantsList.map((restaurant) => (
              <CollectionRestaurantView
                key={restaurant.restaurant.id}
                restaurant={restaurant}
                removeRestaurant={props.addRestaurant}
              />
              // <p
              //   className="collection-item"
              //   key={restaurant.restaurant.id}
              //   onClick={() => props.addRestaurant(restaurant.restaurant.id)}
              // >
              //   {restaurant.restaurant.name}
              // </p>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  let restaurants = (
    <div className="col s12 m6">
      <div className="card">
        <div className="card-content">
          <span className="card-title">List of restaurants</span>
          <ul className="collection">
            {props.restaurants.map((restaurant) => (
              <CollectionRestaurantView
                key={restaurant.restaurant.id}
                restaurant={restaurant}
                removeRestaurant={props.removeRestaurant}
              />
              // <p
              //   className="collection-item"
              //   key={restaurant.restaurant.id}
              //   onClick={() => props.removeRestaurant(restaurant.restaurant.id)}
              // >
              //   {restaurant.restaurant.name}
              // </p>
            ))}
          </ul>
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
