import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Context";
import Graph from "../../Component/Graph";
import WatchList from "./Component/CurrenciesInfo/WatchList";
import PopularCurrency from "./Component/CurrenciesInfo/PopularCurrency";
import CurrencyDatailsHeader from "./Component/CurrencyDatailsHeader";
import UserWallet from "./Component/UserWallet";
import CurrenciesInfo from "./Component/CurrenciesInfo";

const Homepage = () => {
  const { currencyData, Loading, userData } = useGlobalContext();

  const [popularCurrenciesData, setPopularCurrenciesData] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState();
  const [userLoading, setUserLoading] = useState(true);
  const [watchListData, setWatchListData] = useState([]);

  useEffect(() => {
    if (!Loading) {
      const popularCurrencyData = currencyData.filter((obj) => {
        const { currencyCode } = obj;
        return currencyCode === "USD" || currencyCode === "YER";
      });

      setPopularCurrenciesData(popularCurrencyData);
      setCurrentCurrency(popularCurrencyData[0]);

      for (let i = 0; i < userData.watchList.length; i++) {
        const watchListItem = currencyData.filter((obj) => {
          return obj.currencyCode === userData.watchList[i];
        });
        if (watchListItem.length > 0)
          setWatchListData((prev) => prev.concat(watchListItem));
      }

      setUserLoading(false);
    }
  }, [Loading]);

  if (userLoading) {
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
          <CurrencyDatailsHeader currentCurrency={currentCurrency} />
          <div className="graph-container">
            <Graph currentCurrency={currentCurrency.currencyCode} />
          </div>
          <UserWallet userData={userData} />
        </div>
        <div className="user-profile-section-b">
          <CurrenciesInfo
            popularCurrenciesData={popularCurrenciesData}
            watchListData={watchListData}
            setCurrentCurrency={setCurrentCurrency}
          />
        </div>
      </div>
    </>
  );
};
export default Homepage;
