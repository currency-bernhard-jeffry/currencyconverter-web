// Link Country By Currency Code
// urlCurrencyName =
//   "https://country-api-jeffrymahbuubi.netlify.app/data/src/country-by-currency-name.json";
urlCurrencyName =
  "https://country-api-jeffrymahbuubi.netlify.app/data/src/country-by-currency-name.json";
// Link Convert Currency API Free
// urlConvertCurency =
//   "var requestURL = 'https://api.exchangerate.host/convert?from=USD&to=EUR';";
urlConvertCurrency =
  "var requestURL = 'https://api.exchangerate.host/convert?from=USD&to=EUR';";

const fromCurrency = document.getElementById("from-currency");
// const selectedCurrency = fromCurrency.options[fromCurrency.selectedIndex].text
const selectedFromCurrency =
  fromCurrency.options[fromCurrency.selectedIndex].innerHTML;

const toCurrency = document.getElementById("to-currency");
const selectedToCurrency =
  toCurrency.options[toCurrency.selectedIndex].innerHTML;
// const fromCurrency = document.getElementById("from-currency");
// const toCurrency = document.getElementById("to-currency");

let countriesName = [];
let countriesCurrency = [];

function showCountryAndCode() {
  apiCountry.forEach((item) => {
    countriesName.push(item.country);
    countriesCurrency.push(item.currency_code);
  });

  // Create element option and pass it to "from-country" and "to-country"
  countriesName.forEach((countryName) => {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = countryName;
    fromCurrency.append(optionElement);
    toCurrency.append(optionElement);
  });
}

// The reason we use let instead a constant, because in the beginning we're setting it as
// an empty array, but he're we actually changing the value of it to pass in the quote.
let apiCountry = [];

// Get Countries Name and Currency Codes Names From API
async function getCountryInformations() {
  const apiUrl =
    "https://jeffrymahbuubi.github.io/currency-api/data/src/country-by-currency-code.json";
  try {
    // const response will not be populated until it has some data fetched from the API
    // Only setup the const response when we get the data
    const response = await fetch(apiUrl);

    // apiCurrencies turning the data fetched into a JSON object from a Web Serer
    apiCountry = await response.json();
    showCountryAndCode();
  } catch (error) {
    console.log(error);
  }
}

getCountryInformations();
