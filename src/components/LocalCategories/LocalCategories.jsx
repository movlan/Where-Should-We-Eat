import React from "react";

export const LocalCategories = (props) => {
  function handleChange(e) {
    props.selectCategory(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="col s12 m6">
      <form onSubmit={handleSubmit}>
        <br />
        <select className="browser-default" onChange={(e) => handleChange(e)}>
          <option value="" disabled selected>
            Choose Category
          </option>
          {props.localCategories.map((cat) => (
            <option
              key={cat.categories.id}
              value={cat.categories.id}
              // onClick={() => props.selectCategory(cat.categories.id)}
            >
              {cat.categories.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};