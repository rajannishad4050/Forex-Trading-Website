function changeRatesBaseUsdToRupees(UsdBaseCurrenciesRate) {
  const rupeesBaseCurrenciesRate = {};
  Object.entries(UsdBaseCurrenciesRate).forEach(([key, value]) => {
    rupeesBaseCurrenciesRate[key] = value / UsdBaseCurrenciesRate.INR;
  });

  return rupeesBaseCurrenciesRate;
}

export default changeRatesBaseUsdToRupees;
