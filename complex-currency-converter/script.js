// Link Country By Currency Code
urlCurrencyName =
  "https://country-api-jeffrymahbuubi.netlify.app/data/src/country-by-currency-name.json";

// Link Convert Currency API Free
urlConvertCurency =
  "var requestURL = 'https://api.exchangerate.host/convert?from=USD&to=EUR';";

const fromCurrency = document.querySelector("#from-currency");
const toCurrency = document.querySelector("#to-currency");

function showCountryAndCode() {
  fromCurrency.append(createOptionElement());
  toCurrency.append(createOptionElement());
}

function createOptionElement() {
  fragment = new DocumentFragment();

  apiCountry.forEach((item, index) => {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = `${item.country}`;
    optionElement.setAttribute("value", `${item.currency_code}`);
    fragment.append(optionElement);
  });

  return fragment;
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
