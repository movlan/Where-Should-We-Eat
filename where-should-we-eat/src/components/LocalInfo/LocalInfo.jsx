import React from "react";

function LocalInfo(props) {
  let info = props.localInfo ? (
    <div className="card">
      <div className="card-content">
        {/* <div className=""></div> */}
        <span className="card-title">Local Information</span>
        <p>City: {props.localInfo.popularity.city}</p>
        <p>Neighborhood: {props.localInfo.popularity.subzone}</p>
        <p>Top cuisines: </p>
        <div className="collection">
          {props.localInfo.popularity.top_cuisines.map((cuisines, i) => (
            <p className="collection-item" key={i}>
              {cuisines}
            </p>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>loading...</p>
  );

  return <div className="col s12 m4">{info}</div>;
}

export default LocalInfo;
