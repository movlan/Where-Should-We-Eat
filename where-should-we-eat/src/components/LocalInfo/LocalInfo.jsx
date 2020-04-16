import React from "react";

function LocalInfo(props) {
  let info = props.localInfo ? (
    <div>
      <h2>Local Information</h2>
      <p>City: {props.localInfo.popularity.city}</p>
      <p>Neighborhood: {props.localInfo.popularity.subzone}</p>
      <p>Top cuisines: </p>
      {props.localInfo.popularity.top_cuisines.map((cuisines, i) => (
        <p key={i}>{cuisines}</p>
      ))}
    </div>
  ) : (
    <p>loading...</p>
  );

  return <div>{info}</div>;
}

export default LocalInfo;
