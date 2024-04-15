import React from "react";
import LoginUser from "../../../API-Calls/LoginUser";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../Context";

function DemoLoginSection() {
  const navigate = useNavigate();
  const { setAuthToken } = useGlobalContext();

  const onDemoLoginButtonClicked = async () => {
    const username = "demo";
    const password = "qwerty";
    const response = await LoginUser(username, password);

    if (response.status === "success") {
      setAuthToken(response.token);
      navigate("/");
    }

    if (response.status === "error") {
      alert("server error");
    }
  };

  return (
    <div className="demo-login-section">
      <p className="or">Or</p>
      <div className="demo-login-btn-container">
        <button
          type="button"
          className="demo-login-btn"
          onClick={onDemoLoginButtonClicked}
        >
          Demo Login
        </button>
      </div>
    </div>
  );
}

export default DemoLoginSection;
