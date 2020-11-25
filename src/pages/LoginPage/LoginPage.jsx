import React, { Component } from "react";
import userService from "../../utils/userService";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
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
      this.props.handleSignupOrLogin();
      this.props.history.push("/");
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
            name="password"
            onChange={this.handleChange}
          ></input>
        </div>
        <div>
          <button className="btn">Log In</button>
        </div>
      </form>
    );
  }
}

export default LoginPage;
