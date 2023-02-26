import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import Logo from "./Logo";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const myRef = useRef();
  const [gotSearchResult, setGotSearchResult] = useState(false);
  const [resultVisibile, setResultVisible] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  const {
    userData,
    setUserData,
    currencyData,
    setSearchFilterData,
    searchFilterData,
  } = useGlobalContext();

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setSearchFilterData([]);
      setInputValue("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const temp = () => {
    const data = userData.AquiredCurrency.filter((item) => {
      return item.amount > 0;
    });
    setUserData((prev) => ({
      ...prev,
      AquiredCurrency: data,
    }));
  };

  const searching = (keyword) => {
    setInputValue(keyword);
    const keywordLength = keyword.length;

    // filtering data for search result
    if (keywordLength > 0) {
      const filterData = currencyData.filter((item) => {
        return item.currencyName
          .toLowerCase()
          .slice(0, keywordLength)
          .includes(keyword);
      });
      setSearchFilterData(filterData);
      setResultVisible(true);
    } else {
      setSearchFilterData([]);
      setResultVisible(false);
    }
  };

  const resetInputValue = () => {
    setInputValue("");
    setSearchFilterData([]);
    setResultVisible(false);
  };

  return (
    <>
      <header>
        <div className="header-section-a flex align-center">
          <div onClick={temp} className="logo">
            <Link
              className="cursor-pointer"
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Logo />
            </Link>
          </div>
          <div ref={myRef} className="search-bar-area">
            <div className="search-bar flex justify-between align-center">
              <div
                style={{ gap: "10px" }}
                className="search-bar-a flex align-center"
              >
                <svg
                  className="search-icon"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
                <input
                  onChange={(e) => searching(e.target.value.toLowerCase())}
                  className="search-input"
                  value={inputValue}
                  type="text"
                  name="search-input"
                  id="search-input"
                  placeholder="Search"
                />
              </div>
              <svg
                onClick={resetInputValue}
                className="cancel-icon cursor-pointer"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
              </svg>
            </div>
            <div className={resultVisibile ? "result" : "result display-none"}>
              {searchFilterData.length > 0 ? (
                <ul className="some-result">
                  {searchFilterData.map((item, index) => {
                    if (index < 8) {
                      return (
                        <Link
                          key={index}
                          onClick={() => {
                            setSearchFilterData([]);
                            setInputValue("");
                            setResultVisible(false);
                          }}
                          to={`/trading/${item.currencyCode}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <div
                            key={index}
                            className="found-item cursor-pointer"
                          >
                            <li>{item.currencyName}</li>
                            <div className="item-code clr-gray">
                              {item.currencyCode}
                            </div>
                          </div>
                        </Link>
                      );
                    }
                  })}
                </ul>
              ) : (
                <div className="no-result">No result.</div>
              )}
            </div>
          </div>
        </div>
        <div className="header-section-b">
          <div className="bars" onClick={() => setNavVisible(true)}>
            <div className="bar-line"></div>
            <div className="bar-line"></div>
            <div className="bar-line"></div>
          </div>
          <nav className={navVisible ? "header-nav nav-visible" : "header-nav"}>
            <svg
              onClick={() => setNavVisible(false)}
              className="nav-cancel-btn cursor-pointer"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="presentation"
            >
              <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
            </svg>
            <ul className="header-list-container flex justify-center">
              <Link
                className="cursor-pointer"
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <li>User Profile</li>
              </Link>
              <li className="logout-btn">Logout</li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Header;
