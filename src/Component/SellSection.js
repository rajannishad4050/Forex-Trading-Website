import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context";
import CurrencyConvert from "../CurrencyConveter";
import PopUP from "./PopUP";

const SellSection = ({ currentCurrency, aquiredAmount, aquiredCurrencies }) => {
  const { userData, setUserData, currencyData } = useGlobalContext();

  const [sales, setSales] = useState(0);
  const [secondaryCurrency, setSecondaryCurrency] = useState("INR");
  const [secondaryCurrencyAmount, setSecondaryCurrencyAmount] = useState(0);
  const [secondaryCurrencyRate, setSecondaryCurrencyRate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const [bgRed, setBgRed] = useState(true);

  useEffect(() => {
    // filtering secondary currency from user Aquiredcurrency
    const currentSecondaryCurrency = userData.AquiredCurrency.filter((obj) => {
      return obj.currencyCode === secondaryCurrency;
    });

    // getting total amount of secondary curreny we have and setting it to state
    const secondaryAmount = currentSecondaryCurrency[0].amount;
    setSecondaryCurrencyAmount(secondaryAmount);

    // getting the market rate of the secondary currency and setting it to state
    const secondaryRate = currencyData.filter((obj) => {
      return obj.currencyCode === secondaryCurrency;
    });
    const value = secondaryRate[0].rate;
    setSecondaryCurrencyRate(value);
  }, [secondaryCurrency, userData]);

  useEffect(() => {
    const estimatingPrice = () => {
      const result = CurrencyConvert(
        amount,
        currentCurrency.rate,
        secondaryCurrencyRate
      );

      if (amount > aquiredAmount) {
        console.log("amount should be less or equal to the aquired money");
      }

      if (amount > 0 && Number) setSales(result);
      else setSales(0);
    };
    estimatingPrice();
  }, [amount, secondaryCurrencyRate]);

  const sell = () => {
    if (aquiredAmount >= amount && amount > 0) {
      // checking if aquired currency have our current currency in array or not

      const checkCurrentCurrency = userData.AquiredCurrency.filter((obj) => {
        return obj.currencyCode === currentCurrency.currencyCode;
      });

      // if we have current currency in aquired currency array

      if (checkCurrentCurrency.length > 0) {
        // subtracting amount in current currency

        const substractingAmountInArray = userData.AquiredCurrency.map(
          (obj) => {
            return obj.currencyCode === currentCurrency.currencyCode
              ? { ...obj, amount: obj.amount - amount }
              : { ...obj };
          }
        );

        // adding amount from that came from sales

        const addingAmountFromArray = substractingAmountInArray.map((obj) => {
          return obj.currencyCode === secondaryCurrency
            ? { ...obj, amount: obj.amount + sales }
            : { ...obj };
        });

        setUserData((prevState) => ({
          ...prevState,
          AquiredCurrency: addingAmountFromArray,
        }));
      }

      setContent("successfully sold");
      setVisible(true);
      setBgRed(false);
    } else {
      setContent("Not have enough funds");
      setVisible(true);
      setBgRed(true);
    }

    setTimeout(() => {
      setVisible(false);
    }, 2600);

    setAmount(0);
    setInputValue("");
  };

  return (
    <div className="sell-section">
      <PopUP visible={visible} content={content} bgRed={bgRed} />
      <div className="sellSection-aquired-amount-container flex justify-between font-sm mt-10">
        <div className="sellSection-aquired-amount-label">Aquired Amount</div>
        <div className="sellSection-aquired-amount-value">
          {aquiredAmount.toFixed(2)}
        </div>
      </div>
      <div className="amount-container flex justify-between font-sm align-center mt-10">
        <label className="amount-label" htmlFor="amount-input">
          Amount
        </label>
        <input
          min={0}
          max={aquiredAmount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
            setInputValue(e.target.value);
          }}
          value={inputValue}
          type="number"
          name="amount-input"
          id="amount-input"
          className="amount-input-value"
        />
      </div>
      <div className="recieving-currency-converter flex justify-between font-sm mt-10">
        <label
          className="recieving-currency-label"
          htmlFor="recieving-currency-dropdown"
        >
          Recieving
        </label>
        <select
          onChange={(e) => setSecondaryCurrency(e.target.value)}
          className="recieving-currency-dropdown"
          name="recieving-currency-dropdown"
          id="recieving-currency-dropdown"
        >
          {aquiredCurrencies.length > 0 ? (
            aquiredCurrencies.map((item, index) => {
              const currencyCode = item.currencyCode;
              return (
                <option key={index} value={currencyCode}>
                  {currencyCode}
                </option>
              );
            })
          ) : (
            <option value="none">none</option>
          )}
        </select>
      </div>
      <div className="sales-container flex justify-between font-sm mt-10">
        <p className="sales-label">Sales</p>
        <p className="sales-value">{sales.toFixed(2)}</p>
      </div>
      <div className="sell-btn-container flex justify-center mt-10">
        <button onClick={sell} className="sell-btn cursor-pointer w-full">
          Sell
        </button>
      </div>
    </div>
  );
};
export default SellSection;
