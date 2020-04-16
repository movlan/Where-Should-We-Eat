import React from "react";

export const LocalCategories = (props) => {
  function handleClick(id) {
    props.selectCategory(id);
  }

  let categories =
    props.localCategories.length > 0 ? (
      <form>
        <label>
          Pick selectCategory
          <select>{this.options}</select>
        </label>
      </form>
    ) : (
      <p>loading...</p>
    );

  return <div>{categories}</div>;
};
