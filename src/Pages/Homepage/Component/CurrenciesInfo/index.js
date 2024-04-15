import React from "react";
import PopularCurrency from "./PopularCurrency";
import WatchList from "./WatchList";

function Index({ popularCurrenciesData, watchListData, setCurrentCurrency }) {
  return (
    <div className="currencies">
      <PopularCurrency
        popularCurrenciesData={popularCurrenciesData}
        setCurrentCurrency={setCurrentCurrency}
      />
      <WatchList
        watchListData={watchListData}
        setCurrentCurrency={setCurrentCurrency}
      />
    </div>
  );
}

export default Index;
