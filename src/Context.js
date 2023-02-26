import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [currencyData, setCurrencyData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [searchFilterData, setSearchFilterData] = useState([]);
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
      "X-RapidAPI-Host": "currencyscoop.p.rapidapi.com",
      "X-RapidAPI-Key": "bf300f87abmsh24011b6bb15af02p18b479jsn2542ba30b834",
    },
  };

  const fetchingLatestCurrencyRate = async () => {
    const response = await fetch(
      "https://currencyscoop.p.rapidapi.com/latest?base=INR",
      options
    );
    const data = await response.json();
    const rates = await data.response.rates;
    return rates;
  };

  const fectchingCurrencyCode = async () => {
    const response = await fetch(
      "https://currencyscoop.p.rapidapi.com/currencies",
      options
    );
    const data = await response.json();
    const currencyList = await data.response.fiats;
    return currencyList;
  };

  const joiningBothArray = (currencyList, rates) => {
    const currencyListArray = Object.values(currencyList);
    const ratesArray = Object.entries(rates);

    let i = 0;
    for (i; i < ratesArray.length; i++) {
      const newArray = currencyListArray.filter((obj) => {
        return obj.currency_code === ratesArray[i][0];
      });
      if (newArray.length > 0) {
        const { currency_name, currency_code, countries } = newArray[0];
        setCurrencyData((prev) =>
          prev.concat({
            currencyCode: currency_code,
            currencyName: currency_name,
            countryName: countries,
            rate: 1 / ratesArray[i][1],
          })
        );
      }
    }
  };

  useEffect(async () => {
    const rates = await fetchingLatestCurrencyRate();
    const currencyList = await fectchingCurrencyCode();

    // making rates array and currency array into single array
    joiningBothArray(currencyList, rates);
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
