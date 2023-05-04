import React, { useState, useContext, useEffect } from "react";
import { currencyCodeNames } from "./currencyCodeNames";
import moment from "moment";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [currencyData, setCurrencyData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [todayCurrenciesRate, setTodayCurrenciesRate] = useState();
  const [userData, setUserData] = useState({
    AquiredCurrency: [],
    watchList: [],
  });

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      const data = {
        AquiredCurrency: [
          { currencyCode: "INR", currencyName: "rupees", amount: 1000000 },
          {
            currencyCode: "USD",
            currencyName: "United States dollar",
            amount: 1000,
          },
        ],
        watchList: ["AED", "CHF", "CAD", "JMD", "KES", "KWD", "KPW", "RUB"],
      };
      localStorage.setItem("user", JSON.stringify(data));
      setUserData(JSON.parse(localStorage.getItem("user")));
    } else {
      setUserData(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [userData]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "bf300f87abmsh24011b6bb15af02p18b479jsn2542ba30b834",
      "X-RapidAPI-Host": "currencyapi-net.p.rapidapi.com",
    },
  };

  const fetchingLatestCurrencyRate = async () => {
    const response = await fetch(
      "https://currencyapi-net.p.rapidapi.com/rates?output=JSON&base=USD",
      options
    );
    const data = await response.json();
    return data.rates;
  };

  const settingTodayCurrienciesRate = (ratesObj) => {
    // converted obj to array
    const ratesArray = Object.entries(ratesObj);
    const modifiedRatesArray = ratesArray.map((item) => {
      return [item[0], item[1] / ratesObj.INR];
    });
    //converted array to obj back
    const rupeeBaseRates = Object.fromEntries(modifiedRatesArray);
    setTodayCurrenciesRate({
      date: moment().format("YYYY-MM-DD"),
      rates: rupeeBaseRates,
    });
  };

  const joiningBothArray = (currencyCodeNames, ratesObj) => {
    // convertering object to array
    const ratesArray = Object.entries(ratesObj);

    for (let i = 0; i < ratesArray.length; i++) {
      const newArray = currencyCodeNames.filter((item) => {
        return item[0] === ratesArray[i][0];
      });
      if (newArray.length > 0) {
        setCurrencyData((prev) =>
          prev.concat({
            currencyCode: ratesArray[i][0],
            currencyName: newArray[0][1],
            rate: ratesObj.INR / ratesArray[i][1],
          })
        );
      }
    }
  };

  useEffect(async () => {
    const ratesObj = await fetchingLatestCurrencyRate();
    settingTodayCurrienciesRate(ratesObj);

    // making rates array and currency array into single array
    joiningBothArray(currencyCodeNames, ratesObj);
    setLoading(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currencyData,
        Loading,
        userData,
        setUserData,
        searchFilterData,
        setSearchFilterData,
        todayCurrenciesRate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };