import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  let nav = props.user ? (
    <div>
      <Link to="" onClick={props.handleLogout}>
        LOG OUT
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <span>WELCOME, {props.user.name}</span>
    </div>
  ) : (
    <div>
      <Link to="/login">LOG IN</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/signup">SIGN UP</Link>
    </div>
  );

  return <div>{nav}</div>;
};

export default NavBar;
