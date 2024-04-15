import React, { useEffect, useState, useRef } from "react";
import Nav from "./Component/Nav";
import Search from "./Component/Search";
import WebsiteLogo from "./Component/WebsiteLogo";

const Header = () => {
  return (
    <>
      <header>
        <div className="header-section-a flex align-center">
          <WebsiteLogo />
          <Search />
        </div>
        <div className="header-section-b">
          <Nav />
        </div>
      </header>
    </>
  );
};
export default Header;
