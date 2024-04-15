import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../Assets/Logo";

function WebsiteLogo() {
  return (
    <div className="logo">
      <Link
        className="cursor-pointer"
        to="/"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Logo />
      </Link>
    </div>
  );
}

export default WebsiteLogo;
