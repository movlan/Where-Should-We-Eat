import React from "react";

export default (props) => {
  let r = 5;
  let hsl = `hsl(${122 - r * 23.6}, ${39 + r * 10.2}%, ${49 + r * 1.8}%)`;
  return (
    <div className="col s12">
      <div className="card">
        <div className="row">
          <div className="col s3">
            <img src="/logo512.png" alt="" className="responsive-img" />
          </div>
          <div className="col s8">
            <p>
              <span className="establishment">type of establishment</span>
              <br />
              <span className="restaurant">name of place</span>
              <br />
              <span className="neighborhood">neighborhood</span>
              <br />
              <span className="address">address</span>
            </p>
          </div>
          <div className="col s1">
            <span className="badge white-text" style={{ backgroundColor: hsl }}>
              {r}
            </span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="row">
          <div className="col s3">
            <p className="info">
              CUISINES:
              <br />
              COST FOR TWO:
              <br />
              HOURS:
            </p>
          </div>
          <div className="col s9">
            <p className="info-rest">
              cuisine, another
              <br />
              $121
              <br />
              Hours
            </p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="row center-align">
          <div className="col s6">
            <p className="center-align btn green">YES</p>
          </div>
          <div className="col s6">
            <p className="center-align btn red">NO</p>
          </div>
        </div>
      </div>
    </div>
  );
};
