import React from "react";

export const LocalEstablishments = (props) => {
  let establishments =
    props.localEstablishments.length > 0 ? (
      <div className="col s12 m4">
        <div className="card">
          <div className="card-content">
            <span className="card-title">Local Establishments</span>
            <div className="collection">
              {props.localEstablishments.map((establishment) => (
                <p
                  className="collection-item"
                  key={establishment.establishment.id}
                  onClick={() =>
                    props.selectEstablishment(establishment.establishment.id)
                  }
                >
                  {establishment.establishment.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <p>loading...</p>
    );

  return <div>{establishments}</div>;
};
