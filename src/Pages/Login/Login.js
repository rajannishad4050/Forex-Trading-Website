import React from "react";
import "../../Styles/login.css";
import LoginSection from "./Components/LoginSection";
import DemoLoginSection from "./Components/DemoLoginSection";

function Login() {
  return (
    <div className="login-main">
      <LoginSection />
      <DemoLoginSection />
    </div>
  );
}

export default Login;
