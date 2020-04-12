import React, { Component } from "react";
// import { Link } from "react-router-dom";
import userService from "../utils/userService";

class LoginPage extends Component {
  state = {
    email: "",
    pswd: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <header>Log In</header>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="pswd"
            onChange={this.handleChange}
          ></input>
        </div>
        <div>
          <button>Log In</button>
        </div>
      </form>
    );
  }
}

export default LoginPage;
