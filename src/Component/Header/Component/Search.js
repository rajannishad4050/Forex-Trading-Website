import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../../Context";
import SearchIcon from "../../../Assets/SearchIcon";
import { Link } from "react-router-dom";
import CancelIcon from "../../../Assets/CancelIcon";

function Search() {
  const { currencyData } = useGlobalContext();
  const myRef = useRef();
  const [searchedData, setSearchedData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showSearchedData, setShowSearchedData] = useState(false);

  const handleSearch = (searchedInputText) => {
    setInputValue(searchedInputText);
    const searchedTextLength = searchedInputText.length;

    if (searchedTextLength > 0) {
      const filteredItem = currencyData.filter((currency) => {
        return currency.currencyName
          .slice(0, searchedTextLength)
          .toLowerCase()
          .includes(searchedInputText.toLowerCase());
      });
      setSearchedData(filteredItem);
      setShowSearchedData(true);
    } else {
      setSearchedData([]);
      setShowSearchedData(false);
    }
  };

  const resetInputValue = () => {
    setInputValue("");
    setSearchedData([]);
    setShowSearchedData(false);
  };

  const handleClickOutside = (e) => {
    if (!myRef?.current?.contains(e.target)) {
      setSearchedData([]);
      setInputValue("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={myRef} className="search-bar-area">
      <div className="search-bar flex justify-between align-center">
        <div style={{ gap: "10px" }} className="search-bar-a flex align-center">
          <SearchIcon />
          <input
            onChange={(e) => handleSearch(e.target.value.toLowerCase())}
            className="search-input"
            value={inputValue}
            type="text"
            name="search-input"
            id="search-input"
            placeholder="Search"
          />
        </div>
        <button onClick={resetInputValue} className="search-clear-button">
          <CancelIcon cssClass="search-clear-icon" />
        </button>
      </div>
      <div className={showSearchedData ? "result" : "display-none"}>
        {searchedData.length > 0 ? (
          <ul className="some-result">
            {searchedData.map((item, index) => {
              if (index < 8) {
                return (
                  <Link
                    key={index}
                    onClick={() => {
                      setSearchedData([]);
                      setInputValue("");
                      setShowSearchedData(false);
                    }}
                    to={`/trading/${item.currencyCode}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div key={index} className="found-item cursor-pointer">
                      <li>{item.currencyName}</li>
                      <div className="item-code clr-gray">
                        {item.currencyCode}
                      </div>
                    </div>
                  </Link>
                );
              } else {
                return null;
              }
            })}
          </ul>
        ) : (
          <div className="no-result">No result.</div>
        )}
      </div>
    </div>
  );
}

export default Search;
