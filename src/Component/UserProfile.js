import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import Graph from "./Graph";

const UserProfile = () => {
  const { currencyData, Loading, userData } = useGlobalContext();

  const [popularCurrency, setPopularCurrency] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState();
  const [userLoading, setUserLoading] = useState(true);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    if (!Loading) {
      const popularCurrencyData = currencyData.filter((obj) => {
        const { currencyCode } = obj;
        return currencyCode === "USD" || currencyCode === "YER";
      });

      setPopularCurrency(popularCurrencyData);
      setCurrentCurrency(popularCurrencyData[0]);

      for (let i = 0; i < userData.watchList.length; i++) {
        const watchListItem = currencyData.filter((obj) => {
          return obj.currencyCode === userData.watchList[i];
        });
        if (watchListItem.length > 0)
          setWatchList((prev) => prev.concat(watchListItem));
      }

      setUserLoading(false);
    }
  }, [Loading]);

  if (watchList) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="user-profile-main flex justify-center">
        <div className="user-profile-section-a">
          <div className="currency-details">
            <h1>{currentCurrency.currencyName}</h1>
            <h1>₹{currentCurrency.rate.toFixed(2)}</h1>
          </div>
          <div className="graph-container">
            <Graph currentCurrency={currentCurrency.currencyCode} />
          </div>
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
                      <div className="list-item-currency-name">
                        {currencyName}
                      </div>
                    </div>
                    <div className="list-item-amount">{amount.toFixed(2)}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="user-profile-section-b">
          <div className="currencies">
            <div className="popular-currency">
              <h1>Popular</h1>
              {popularCurrency.map((item, index) => {
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
                        Detail
                      </button>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="watchlist">
              <h1>Watchlist</h1>
              {watchList.map((item, index) => {
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
                        Detail
                      </Link>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
