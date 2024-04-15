import React from "react";
import { Link } from "react-router-dom";

function WatchList({ watchListData, setCurrentCurrency }) {
  return (
    <div className="watchlist">
      <h1>Watchlist</h1>
      {watchListData.map((item, index) => {
        const price = item.rate.toFixed(2);

        return (
          <div key={index} className="currency flex justify-between">
            <div
              style={{ gap: "55px" }}
              onClick={() => setCurrentCurrency(item)}
              className="currency-code-container flex cursor-pointer"
            >
              <div>{item.currencyCode}</div>
              <div>₹{price}</div>
            </div>
            <button
              onClick={() => {
                setCurrentCurrency(item);
              }}
              className="currency-details-btn"
            >
              <Link
                to={`/trading/${item.currencyCode}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Buy
              </Link>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default WatchList;
