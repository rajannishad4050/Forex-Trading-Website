import React from "react";

function CurrencyDatailsHeader({ currentCurrency }) {
  return (
    <div className="currency-details">
      <h1>{currentCurrency.currencyName}</h1>
      <h1>₹{currentCurrency.rate.toFixed(2)}</h1>
    </div>
  );
}

export default CurrencyDatailsHeader;
