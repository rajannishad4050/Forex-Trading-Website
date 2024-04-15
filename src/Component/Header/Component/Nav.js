import React, { useState } from "react";
import { Link } from "react-router-dom";
import CancelIcon from "../../../Assets/CancelIcon";
import { useGlobalContext } from "../../../Context";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [showNav, setShowNav] = useState(false);
  const { setAuthToken } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="bars" onClick={() => setShowNav(true)}>
        <div className="bar-line"></div>
        <div className="bar-line"></div>
        <div className="bar-line"></div>
      </div>
      <nav className={showNav ? "header-nav nav-visible" : "header-nav"}>
        <button
          onClick={() => setShowNav(false)}
          className="sidebar-cancel-button"
        >
          <CancelIcon cssClass="nav-cancel-btn cursor-pointer" />
        </button>
        <ul className="header-list-container flex justify-center">
          <Link
            className="cursor-pointer"
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li>User Profile</li>
          </Link>
          <li
            className="logout-btn cursor-pointer"
            onClick={() => {
              navigate("/login");
              setAuthToken(null);
            }}
          >
            Logout
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
