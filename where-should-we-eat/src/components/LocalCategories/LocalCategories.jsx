import React from "react";

export const LocalCategories = (props) => {
  function handleClick(id) {
    props.selectCategory(id);
  }

  let categories =
    props.localCategories.length > 0 ? (
      <div>
        <h2>Local Categories</h2>
        <ul style={{ listStyleType: "none" }}>
          {props.localCategories.map((cat) => (
            <li
              key={cat.categories.id}
              onClick={() => handleClick(cat.categories.id)}
            >
              {cat.categories.name}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p>loading...</p>
    );

  return <div>{props.restaurants.length === 0 ? categories : null}</div>;
};
