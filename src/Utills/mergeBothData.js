const mergeBothData = (
  currenciesNameByCurrencyCode,
  currenciesRateByCurrencyCode
) => {
  let mergedData = [];

  for (let i = 0; i < currenciesRateByCurrencyCode.length; i++) {
    const filtereditem = currenciesNameByCurrencyCode.filter(
      (currencyNameByCurrencyCode) => {
        const currencyNameCurrencyCode = currencyNameByCurrencyCode[0];
        const currencyRateCurrencyCode = currenciesRateByCurrencyCode[i][0];

        return currencyNameCurrencyCode === currencyRateCurrencyCode;
      }
    );

    if (filtereditem.length > 0) {
      mergedData = mergedData.concat({
        currencyCode: currenciesRateByCurrencyCode[i][0],
        currencyName: currenciesNameByCurrencyCode[i][1],
        rate: 1 / currenciesRateByCurrencyCode[i][1],
      });
    }
  }

  return mergedData;
};

export default mergeBothData;
