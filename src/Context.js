import React, { useState, useContext, useEffect } from "react";
import currenciesNameByCurrencyCode from "./StaticData/currenciesNameByCurrencyCode";
import fetchCurrenciesRateByCurrencyCode from "./API-Calls/fetchCurrenciesRateByCurrencyCode";
import mergeBothData from "./Utills/mergeBothData";
import convertObjectToArray from "./Utills/convertObjectToArray";
import changeRatesBaseUsdToRupees from "./Utills/changeRatesBaseUsdToRupees";
import moment from "moment";
import { json } from "react-router-dom";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [currencyData, setCurrencyData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [currenciesCurrentRate, setCurrenciesCurrentRate] = useState();
  const [userData, setUserData] = useState({
    AquiredCurrency: [],
    watchList: [],
  });

  useEffect(() => {
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

    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify(data));
      setUserData(data);
    } else if (
      JSON.parse(localStorage.getItem("user")).AquiredCurrency.length === 0
    ) {
      setUserData(data);
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      setUserData(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    const fetch = async () => {
      console.log("sended expensive request");
      const response = await fetchCurrenciesRateByCurrencyCode();
      if (response.status === "successfully fetched") {
        const currenciesRateByCurrencyCode = changeRatesBaseUsdToRupees(
          response.currenciesRateByCurrencyCode
        );
        setCurrenciesCurrentRate({
          date: moment().format("YYYY-MM-DDDD"),
          rates: currenciesRateByCurrencyCode,
        });
        const currenciesRateByCurrencyCodeArrayFormat = convertObjectToArray(
          currenciesRateByCurrencyCode
        );
        const mergedData = mergeBothData(
          currenciesNameByCurrencyCode,
          currenciesRateByCurrencyCodeArrayFormat
        );
        setCurrencyData(mergedData);
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <AppContext.Provider
      value={{
        authToken,
        setAuthToken,
        currencyData,
        Loading,
        userData,
        setUserData,
        currenciesCurrentRate,
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
