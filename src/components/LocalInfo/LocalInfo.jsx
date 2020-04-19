import React from "react";

export const LocalInfo = (props) => {
  let info = props.localInfo ? (
    <div className="card">
      <div className="card-content">
        {/* <div className=""></div> */}
        <span className="card-title">Local Information</span>
        <p>City: {props.localInfo.popularity.city}</p>
        <p>Neighborhood: {props.localInfo.popularity.subzone}</p>
        <p>Top cuisines: </p>
        <ul>
          {props.localInfo.popularity.top_cuisines.map((cuisines, i) => (
            <li key={i}>{cuisines}</li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <p>loading...</p>
  );

  return <div className="col s12">{info}</div>;
};
