const CurrencyConvert = (amount, firstCurrency, secondCurrency) => {
  const result = (amount * firstCurrency) / secondCurrency;
  return result;
};

export default CurrencyConvert;
