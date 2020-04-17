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
        <div>
          {props.localInfo.popularity.top_cuisines.map((cuisines, i) => (
            <span className="collection-item" key={i}>
              {cuisines}
            </span>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>loading...</p>
  );

  return <div className="col s12">{info}</div>;
};
