import React from "react";

const CollectionRestaurantView = (props) => {
  let r = props.restaurant.restaurant.user_rating.aggregate_rating
    ? props.restaurant.restaurant.user_rating.aggregate_rating
    : "N/A";
  let hsl = `hsl(${4 + r * 23.6}, ${90 - r * 10.2}%, ${58 - r * 1.8}%)`;
  return (
    <li
      className="collection-item avatar"
      onClick={() => props.removeRestaurant(props.restaurant.restaurant.id)}
    >
      <img
        src={
          props.restaurant.restaurant.photos
            ? props.restaurant.restaurant.photos[0].photo.thumb_url
            : "/logo512.png"
        }
        alt=""
        className="circle"
      />
      <span className="title">{props.restaurant.restaurant.name}</span>
      <p>
        {props.restaurant.restaurant.location.locality_verbose}
        <br />
        {props.restaurant.restaurant.cuisines}
      </p>
      <div className="secondary-content">
        <span className="badge white-text" style={{ backgroundColor: hsl }}>
          {r}
        </span>
      </div>
    </li>
  );
};

export default CollectionRestaurantView;
