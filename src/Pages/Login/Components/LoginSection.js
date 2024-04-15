import React, { useState } from "react";
import Logo from "../../../Assets/Logo";
import LoginUser from "../../../API-Calls/LoginUser";
import { useGlobalContext } from "../../../Context";
import { Link, useNavigate } from "react-router-dom";

function LoginSection() {
  const { setAuthToken } = useGlobalContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Form validation
  const [usernameDoesNotExist, setUsernameDoesNotExist] = useState();
  const [passwordIsIncorrect, setPasswordIsIncorrect] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      const response = await LoginUser(username, password);

      if (response.status === "success") {
        setAuthToken(response.token);
        navigate("/");
      }

      if (response.status === "username does not exist") {
        setUsernameDoesNotExist(true);
      }

      if (response.status === "password is incorrect") {
        setPasswordIsIncorrect(true);
      }

      if (response.status === "error") {
        alert("server error");
      }
    } else {
      alert("username and password should not be empty");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="login-form flex flex-column">
      <Logo classnames="login-site-logo" />
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        className="username"
        autoComplete="username"
        onChange={(e) => {
          setUsername(e.target.value);
          setUsernameDoesNotExist(false);
        }}
        value={username}
      />
      {usernameDoesNotExist ? (
        <p className="warnings">username does not exist</p>
      ) : null}
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        autoComplete="password"
        className="password"
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordIsIncorrect(false);
        }}
        value={password}
      />
      {passwordIsIncorrect ? (
        <p className="warnings">Password is incorrect</p>
      ) : null}
      <button type="submit" className="login-button cursor-pointer">
        Log in
      </button>
      <div className="sign-up-text">
        Don't have account? <Link to="/signup">Sign up</Link>
      </div>
    </form>
  );
}

export default LoginSection;
