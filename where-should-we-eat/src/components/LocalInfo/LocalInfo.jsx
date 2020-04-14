import React from "react";

function LocalInfo(props) {
  if (props.locInfo) {
    return (
      <div>
        <h2>Local Information</h2>
        <p>City: {props.locInfo.popularity.city}</p>
        <p>Neighborhood: {props.locInfo.popularity.subzone}</p>
        <p>Top cuisines: </p>
        {props.locInfo.popularity.top_cuisines.map((cuisines, i) => (
          <p key={i}>{cuisines}</p>
        ))}
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default LocalInfo;
