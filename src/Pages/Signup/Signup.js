import React, { useState } from "react";
import Logo from "../../Assets/Logo";
import "../../Styles/signup.css";
import signupUser from "../../API-Calls/signupUser";
import { useGlobalContext } from "../../Context";
import { Link, useNavigate } from "react-router-dom";
import ButtonLoader from "../../Component/ButtonLoader";

function Signup() {
  const { setAuthToken } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //form validation
  const [usernameAlreadyExist, setUsernameAlreadyExist] = useState(false);
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);
  const [passwordDoesNotMatch, setPasswordDoesNotMatch] = useState(false);

  const navigate = useNavigate();

  const handleSubmitOfForm = async (e) => {
    e.preventDefault();

    if (password === reenterPassword) {
      setLoading(true);
      setPasswordDoesNotMatch(false);

      const response = await signupUser({ email, username, password });

      if (response.status === "successfully registered") {
        setAuthToken(response.token);
        navigate("/");
      }

      if (response.status === "email already exists") {
        setLoading(false);
        setEmailAlreadyExist(true);
      }

      if (response.status === "username already exists") {
        setLoading(false);
        setUsernameAlreadyExist(true);
      }

      if (response.status === "error") {
        setLoading(false);
        alert("server error");
      }
    } else {
      setPasswordDoesNotMatch(true);
    }

    setEmail("");
    setUsername("");
    setPassword("");
    setReenterPassword("");
  };

  return (
    <div className="signup-main">
      <form className="registeration-form" onSubmit={handleSubmitOfForm}>
        <Logo classnames="register-site-logo" />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailAlreadyExist(false);
          }}
          value={email}
          type="email"
          name="register-email"
          id="registerEmail"
          className="register-email"
          placeholder="Email"
        />
        {emailAlreadyExist ? (
          <p className="warnings">Email already exist</p>
        ) : null}
        <input
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameAlreadyExist(false);
          }}
          value={username}
          type="text"
          name="username"
          id="register-username"
          placeholder="Username"
          className="register-username"
        />
        {usernameAlreadyExist ? (
          <p className="warnings">username already exist</p>
        ) : null}
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          name="password"
          id="register-password"
          placeholder="Password"
          className="register-password"
        />
        <input
          onChange={(e) => {
            setReenterPassword(e.target.value);
            setUsernameAlreadyExist(false);
          }}
          value={reenterPassword}
          type="password"
          name="ReEnterPassword"
          id="ReEnterPassword"
          placeholder="Re-enter password"
          className="register-password"
        />
        {passwordDoesNotMatch ? (
          <p className="warnings">re-entered password does not match</p>
        ) : null}
        <button
          type="submit"
          className="signup-button cursor-pointer justify-center items-center"
        >
          {loading ? <ButtonLoader /> : "Signup"}
        </button>
      </form>
      <div className="login-link">
        Already have account? <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
}

export default Signup;
