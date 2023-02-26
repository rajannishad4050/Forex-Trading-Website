import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context";
import BuySection from "./BuySection";
import SellSection from "./SellSection";
import Graph from "./Graph";

const TradingChild = ({ id }) => {
  const { currencyData, Loading, userData, setUserData } = useGlobalContext();
  const [buySection, setBuySection] = useState(true);
  const [currentCurrency, setCurrentCurrency] = useState();
  const [tradingLoading, setTradingLoading] = useState(true);
  const [aquiredAmount, setAquiredAmount] = useState(0);
  const [aquiredCurrencies, setAquiredCurrencies] = useState([]);
  const [inWatchlist, setInWatchlist] = useState(false);

  const gettingCurrentCurrency = () => {
    // when currencydata is fetched from server loading becomes false
    if (!Loading) {
      const currentCurrencyData = currencyData.filter((obj) => {
        return obj.currencyCode === id;
      });
      setCurrentCurrency(currentCurrencyData[0]);
      setTradingLoading(false);
    }
  };

  const gettingCurrentCurrencyAquiredAmount = () => {
    // when current currency is retrieved
    if (currentCurrency) {
      // checking if i have current currency in paticular amount
      const aquiredAmountData = userData.AquiredCurrency.filter((obj) => {
        return obj.currencyCode === currentCurrency.currencyCode;
      });

      // if we have paticular amount of current currency than aquired amount data length will be more than zero
      if (aquiredAmountData.length > 0) {
        setAquiredAmount(aquiredAmountData[0].amount);
      } else {
        // we do not have zero currency in our bank balance
        setAquiredAmount(0);
      }
    }
  };

  const gettingAllTypeOfAcquiredCurrency = () => {
    // this code will run only after we have retrieved current currency

    if (currentCurrency) {
      // filtering all types of currency i have
      const aquiredCurrenciesData = userData.AquiredCurrency.filter((obj) => {
        return obj.currencyCode !== currentCurrency.currencyCode;
      });

      if (aquiredCurrenciesData.length > 0)
        setAquiredCurrencies(aquiredCurrenciesData);
    }
  };

  const checkingCurrentCurrencyInWatchlist = () => {
    if (currentCurrency) {
      // checking if current currency is in user watchlist or not
      const checkWatchlist = userData.watchList.filter((item) => {
        return item === currentCurrency.currencyCode;
      });

      if (checkWatchlist.length > 0) {
        setInWatchlist(true);
      }
    }
  };

  const handleWatch = () => {
    // if current currency not in watchlist adding it to user watchlist
    if (!inWatchlist) {
      setUserData((prevState) => ({
        ...prevState,
        watchList: [...prevState.Watchlist, currentCurrency.currencyCode],
      }));
      setInWatchlist(true);
    }

    // if current currency is in watchlist removing it from user watchlist
    if (inWatchlist) {
      // deleting current currency from watchlist
      const newWatchlist = userData.watchList.filter((item) => {
        return item !== currentCurrency.currencyCode;
      });

      setUserData((prevState) => ({
        ...prevState,
        watchList: newWatchlist,
      }));
      setInWatchlist(false);
    }
  };

  useEffect(() => {
    gettingCurrentCurrency();
  }, [Loading]);

  useEffect(() => {
    // getting current currency total amount that we have
    gettingCurrentCurrencyAquiredAmount();
    // getting all types of currency that we possess
    gettingAllTypeOfAcquiredCurrency();
  }, [userData, currentCurrency]);

  useEffect(() => {
    checkingCurrentCurrencyInWatchlist();
  }, [currentCurrency]);

  if (tradingLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{ gap: "3rem" }} className="trading-main flex justify-center">
        <div className="trading-section-a">
          <div className="currency-details">
            <h1>{currentCurrency.currencyName}</h1>
            <h1>₹{currentCurrency.rate.toFixed(2)}</h1>
          </div>
          <div className="graph-container">
            <Graph currentCurrency={currentCurrency.currencyCode} />
          </div>
        </div>
        <div className="trading-section-b">
          <div className="trading-card">
            <div className="trading-card-header flex justify-around">
              <div
                onClick={() => {
                  setBuySection(true);
                }}
                className={
                  buySection
                    ? "buy bg-grey border-bottom cursor-pointer"
                    : "buy bg-grey  cursor-pointer"
                }
              >
                Buy
              </div>
              <div
                onClick={() => {
                  setBuySection(false);
                }}
                className={
                  buySection
                    ? "sell bg-grey cursor-pointer"
                    : "sell bg-grey border-bottom  cursor-pointer"
                }
              >
                Sell
              </div>
            </div>
            {buySection ? (
              <BuySection
                currentCurrency={currentCurrency}
                aquiredAmount={aquiredAmount}
                aquiredCurrencies={aquiredCurrencies}
              />
            ) : (
              <SellSection
                currentCurrency={currentCurrency}
                aquiredAmount={aquiredAmount}
                aquiredCurrencies={aquiredCurrencies}
              />
            )}
          </div>
          <div className="watch-btn-container flex justify-center">
            <button onClick={handleWatch} className="watch-btn cursor-pointer">
              {inWatchlist ? "Un-Watch" : "Watch"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TradingChild;
