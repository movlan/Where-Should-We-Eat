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
        <label>Establishment:</label>
        <select
          className="browser-default"
          onChange={(e) => handleChange(e)}
          defaultValue="Choose Establishment Type"
        >
          <option disabled>Choose Establishment Type</option>
          {props.localEstablishments.map((establishment) => (
            <option
              key={establishment.establishment.id}
              value={establishment.establishment.id}
            >
              {establishment.establishment.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};
