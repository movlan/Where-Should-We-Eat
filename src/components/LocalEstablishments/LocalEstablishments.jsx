import React from "react";

export const LocalEstablishments = (props) => {
  function handleChange(e) {
    props.selectEstablishment(e.target.value);
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
            Choose Establishment Type
          </option>
          {props.localEstablishments.map((establishment) => (
            <option
              key={establishment.establishment.id}
              value={establishment.establishment.id}
              // onClick={() => props.selectCategory(cat.categories.id)}
            >
              {establishment.establishment.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};
