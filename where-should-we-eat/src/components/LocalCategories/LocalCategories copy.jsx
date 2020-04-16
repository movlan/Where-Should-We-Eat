import React from "react";

export const LocalCategories = (props) => {
  function handleClick(id) {
    props.selectCategory(id);
  }

  let categories =
    props.localCategories.length > 0 ? (
      <div className="col s12 m4">
        <div className="card">
          <div className="card-content">
            <span className="card-title">Local Categories</span>
            <div className="collection">
              {props.localCategories.map((cat) => (
                <p
                  className="collection-item"
                  key={cat.categories.id}
                  onClick={() => props.selectCategory(cat.categories.id)}
                >
                  {cat.categories.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <p>loading...</p>
    );

  return <div>{categories}</div>;
};
