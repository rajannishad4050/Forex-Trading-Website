import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";
import CurrencyConvert from "../CurrencyConveter";
import PopUP from "./PopUP";

const BuySection = ({ currentCurrency, aquiredAmount, aquiredCurrencies }) => {
  const { userData, setUserData, currencyData } = useGlobalContext();

  // states
  // secondary currency is the type of currency in which we will make the payment
  const [payingCurrency, setPayingCurrency] = useState("INR");
  const [secondaryCurrencyAmount, setSecondaryCurrencyAmount] = useState(0);
  const [secondaryCurrencyRate, setSecondaryCurrencyRate] = useState(1);
  const [marketPrice, setMarketPrice] = useState(currentCurrency.rate);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const [bgRed, setBgRed] = useState(true);

  const gettingAllInfoAboutSecondaryCurrency = () => {
    // filtering secondary currency from user Aquiredcurrency
    const currentSecondaryCurrency = userData.AquiredCurrency.filter((obj) => {
      return obj.currencyCode === payingCurrency;
    });

    // getting total amount of secondary curreny we have and setting it to state
    const secondaryAmount = currentSecondaryCurrency[0].amount;
    setSecondaryCurrencyAmount(secondaryAmount);

    // getting the market rate of the secondary currency and setting it to state
    const secondaryRate = currencyData.filter((obj) => {
      return obj.currencyCode === payingCurrency;
    });
    const payingCurrencyRate = secondaryRate[0].rate;
    setSecondaryCurrencyRate(payingCurrencyRate);
    return payingCurrencyRate;
  };

  const settingMarketPriceOfCurrentCurrency = (payingCurrencyRate) => {
    // setting new Market Price according to secondary currency whenever the secondary currency changes

    const TotalAmount = 1;
    const CurrentCurrencyRate = currentCurrency.rate;

    const result = CurrencyConvert(
      TotalAmount,
      CurrentCurrencyRate,
      payingCurrencyRate
    );

    setMarketPrice(result);
  };

  const estimatingPrice = () => {
    // estimating how much it cost to purchase current currency
    const result = CurrencyConvert(
      amount,
      currentCurrency.rate,
      secondaryCurrencyRate
    );
    // result, "result");
    if (amount > 0 && Number) setEstimatedPrice(result);
    else setEstimatedPrice(0);
  };

  const purchase = () => {
    if (secondaryCurrencyAmount > estimatedPrice && amount > 0) {
      // checking if aquired currency have our current currency in array or not

      const checkCurrentCurrency = userData.AquiredCurrency.filter((obj) => {
        return obj.currencyCode === currentCurrency.currencyCode;
      });

      // if we have current currency in aquired currency array already
      if (checkCurrentCurrency.length > 0) {
        // adding amount in current currency
        const addingAmountInArray = userData.AquiredCurrency.map((obj) => {
          return obj.currencyCode === currentCurrency.currencyCode
            ? { ...obj, amount: obj.amount + amount }
            : { ...obj };
        });

        // subrating purchased amount from currency that we have purchased from

        const subtractingAmountFromArray = addingAmountInArray.map((obj) => {
          return obj.currencyCode === payingCurrency
            ? { ...obj, amount: obj.amount - estimatedPrice }
            : { ...obj };
        });

        setUserData((prevState) => ({
          ...prevState,
          AquiredCurrency: subtractingAmountFromArray,
        }));
      }

      // if we do not have current currency in aquired currency we will add it in array on purchasing

      if (checkCurrentCurrency.length == 0) {
        const subtractingAmountFromArray = userData.AquiredCurrency.map(
          (obj) => {
            return obj.currencyCode === payingCurrency
              ? { ...obj, amount: obj.amount - estimatedPrice }
              : { ...obj };
          }
        );

        setUserData((prevState) => ({
          ...prevState,
          AquiredCurrency: subtractingAmountFromArray,
        }));

        setUserData((prevState) => ({
          ...prevState,
          AquiredCurrency: [
            ...prevState.AquiredCurrency,
            { ...currentCurrency, amount },
          ],
        }));
      }
      setContent("successfully purchases");
      setVisible(true);
      setBgRed(false);
    } else {
      setContent("Not have enough funds");
      setVisible(true);
      setBgRed(true);
    }

    let visibleTimer = setTimeout(() => {
      setVisible(false);
    }, 2600);

    setAmount(0);
    setInputValue("");
  };

  useEffect(() => {
    const payingCurrencyRate = gettingAllInfoAboutSecondaryCurrency();
    settingMarketPriceOfCurrentCurrency(payingCurrencyRate);

    return () => {};
  }, [payingCurrency, userData]);

  useEffect(() => {
    estimatingPrice();

    return () => {};
  }, [amount, secondaryCurrencyRate]);

  return (
    <div className="buy-section">
      <PopUP visible={visible} content={content} bgRed={bgRed} />
      <div className="currency-detail-container flex justify-between">
        <div className="trading-card-currency-title w-full flex align-center">
          Buy <span>{currentCurrency.currencyCode}</span>
        </div>
        <div className="aquired-amount font-sm w-full">
          <p className="aquired-amount-label">Aquired Amount:</p>
          <p className="aquired-amount-value">{aquiredAmount.toFixed(2)}</p>
        </div>
      </div>
      <div className="amount-container mt-10 flex justify-between align-center">
        <label className="amount-label font-sm" htmlFor="amount-input">
          Amount
        </label>
        <input
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
      <div className="payment-currency-converter font-sm flex justify-between align-center mt-10">
        <label
          className="payment-currency-label"
          htmlFor="payment-currency-dropdown"
        >
          Payment
        </label>
        <select
          onChange={(e) => {
            setPayingCurrency(e.target.value);
          }}
          className="payment-currency-dropdown"
          name="payment-currency-dropdown"
          id="payment-currency-dropdown"
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
      <div className="market-price-container font-sm flex justify-between mt-10">
        <p className="market-price-label ">Market Price</p>
        <p className="market-price-value">{marketPrice.toFixed(2)}</p>
      </div>
      <div className="estimated-price-container font-sm flex justify-between mt-10">
        <p className="estimates-price-label ">Estimated Price</p>
        <p className="estimated-price-value">{estimatedPrice.toFixed(2)}</p>
      </div>
      <div className="purchase-button-container flex justify-center">
        <button
          onClick={purchase}
          className="purchase-btn mt-10 cursor-pointer w-full"
        >
          Purchase
        </button>
      </div>
      <div className="funds-container flex justify-center mt-10">
        <p className="funds-text">
          Funds : <span>{secondaryCurrencyAmount.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};
export default BuySection;
