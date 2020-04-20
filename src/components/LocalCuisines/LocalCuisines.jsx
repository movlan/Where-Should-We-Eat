import React from "react";

export const LocalCuisines = (props) => {
  function handleChange(e) {
    props.selectCuisines(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="col s12 m4">
      <form onSubmit={handleSubmit}>
        <label>Cuisine:</label>
        <select
          multiple
          className="browser-default"
          onChange={(e) => handleChange(e)}
          defaultValue="Choose Cuisine Type"
        >
          <option className="multi-select" disabled>
            Choose Cuisine Type
          </option>
          {props.localCuisines.map((cuisine) => (
            <option key={cuisine.cuisine_id} value={cuisine.cuisine_id}>
              {cuisine.cuisine_name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};
