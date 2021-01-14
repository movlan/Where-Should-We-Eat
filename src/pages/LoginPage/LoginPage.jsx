import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = (props) => {
  return <LoginForm setUser={props.setUser} history={props.history} />;
};

export default LoginPage;
