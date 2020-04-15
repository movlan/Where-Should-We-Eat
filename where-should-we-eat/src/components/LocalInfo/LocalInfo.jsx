import React from "react";
import { LocalCategories } from "../LocalCategories/LocalCategories";
import { RestaurantsList } from "../RestaurantsList/RestaurantsList";
function LocalInfo(props) {
  let info = props.localInfo ? (
    <div>
      <h2>Local Information</h2>
      <p>City: {props.localInfo.popularity.city}</p>
      <p>Neighborhood: {props.localInfo.popularity.subzone}</p>
      <p>Top cuisines: </p>
      {props.localInfo.popularity.top_cuisines.map((cuisines, i) => (
        <p key={i}>{cuisines}</p>
      ))}
    </div>
  ) : (
    <p>loading...</p>
  );

  return (
    <div>
      {info}
      <LocalCategories
        localCategories={props.localCategories}
        selectCategory={props.selectCategory}
        restaurants={props.restaurants}
      />
      <RestaurantsList
        restaurants={props.restaurants}
        removedRestaurantsList={props.removedRestaurantsList}
        removeRestaurant={props.removeRestaurant}
        addRestaurant={props.addRestaurant}
      />
    </div>
  );
}

export default LocalInfo;
