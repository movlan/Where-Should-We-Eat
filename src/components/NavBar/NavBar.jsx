import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  let userLinks = props.user ? (
    <>
      <li>
        <span>Logged In User, {props.user.name}</span>
      </li>
      <li>
        <Link to="" onClick={props.handleLogout}>
          LOG OUT
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/login">LOG IN</Link>
      </li>
      <li>
        <Link to="/signup">SIGN UP</Link>
      </li>
    </>
  );

  return (
    <React.Fragment>
      <nav className="light-green">
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              Where Should We Eat
            </Link>
            <Link to="" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {userLinks}
            </ul>
          </div>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        {userLinks}
      </ul>
    </React.Fragment>
  );
};

export default NavBar;
