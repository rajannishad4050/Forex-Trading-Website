import React from "react";

function UserWallet({ userData }) {
  return (
    <div className="user-details">
      <div className="user-details-header">
        <div className="index-aquired-currency-container flex">
          <div className="index font-bold">Index</div>
          <div className="currency-name font-bold">Acquired</div>
        </div>
        <div className="total-amount font-bold">Amount</div>
      </div>
      <ul className="user-details-list">
        {userData.AquiredCurrency.map((item, index) => {
          const { currencyName, amount } = item;
          return (
            <li
              key={index}
              className="user-details-list-item flex justify-between"
            >
              <div className="list-index-currency-name-container flex">
                <div className="list-item-index">{index + 1}</div>
                <div className="list-item-currency-name">{currencyName}</div>
              </div>
              <div className="list-item-amount">{amount.toFixed(2)}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UserWallet;
