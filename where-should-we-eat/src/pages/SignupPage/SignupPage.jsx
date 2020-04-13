import React, { Component } from "react";
import SignupForm from "../../components/SignupForm/SignupForm";

class SignupPage extends Component {
  render() {
    return (
      <div className="SignupPage" history={this.props.history}>
        <SignupForm {...this.props} />
      </div>
    );
  }
}

export default SignupPage;
