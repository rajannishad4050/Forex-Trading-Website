const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "bf300f87abmsh24011b6bb15af02p18b479jsn2542ba30b834",
    "X-RapidAPI-Host": "currencyapi-net.p.rapidapi.com",
  },
};

const fetchCurrenciesRate = async () => {
  try {
    const response = await fetch(
      "https://currencyapi-net.p.rapidapi.com/rates?output=JSON&base=USD",
      options
    );
    const data = await response.json();
    return {
      status: "successfully fetched",
      currenciesRateByCurrencyCode: data.rates,
    };
  } catch (error) {
    return { status: "Error while fetching" };
  }
};

export default fetchCurrenciesRate;
