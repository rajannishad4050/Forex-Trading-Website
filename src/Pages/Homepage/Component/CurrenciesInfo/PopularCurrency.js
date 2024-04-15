import React from "react";
import { Link } from "react-router-dom";

function PopularCurrency({ popularCurrenciesData, setCurrentCurrency }) {
  return (
    <div className="popular-currency">
      <h1>Popular</h1>
      {popularCurrenciesData.map((item, index) => {
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
            <Link
              to={`/trading/${item.currencyCode}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button className="currency-details-btn cursor-pointer">
                Buy
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default PopularCurrency;
