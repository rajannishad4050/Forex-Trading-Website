import React, { useState } from "react";
import LoginUser from "../../../API-Calls/LoginUser";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../Context";
import ButtonLoader from "../../../Component/ButtonLoader";

function DemoLoginSection() {
  const navigate = useNavigate();
  const { setAuthToken } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const onDemoLoginButtonClicked = async () => {
    setLoading(true);
    const username = "demo";
    const password = "qwerty";
    const response = await LoginUser(username, password);

    if (response.status === "success") {
      setAuthToken(response.token);
      navigate("/");
    }

    if (response.status === "error") {
      setLoading(false);
      alert("server error");
    }
  };

  return (
    <div className="demo-login-section">
      <p className="or">Or</p>
      <div className="demo-login-btn-container">
        <button
          type="button"
          className="demo-login-btn flex justify-center items-center"
          onClick={onDemoLoginButtonClicked}
        >
          {loading ? <ButtonLoader /> : "Demo Login"}
        </button>
      </div>
    </div>
  );
}

export default DemoLoginSection;
