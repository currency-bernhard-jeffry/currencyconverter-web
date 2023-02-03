const fromCurrency = document.querySelector("#from-currency");
const toCurrency = document.querySelector("#to-currency");
const converterContainer = document.querySelector("#converter-container");
const currencyInput = document.querySelector("#currency-input");

function getExchangeRateLinkAPI() {
  // Populate the select element from-currency and to-currency with Option elements
  fromCurrency.append(createOptionElement());
  toCurrency.append(createOptionElement());

  const fromCurrencyValue = selectElement("from-currency");
  const toCurrencyValue = selectElement("to-currency");

  const urlConvertAPI = `https://api.exchangerate.host/convert?from=${fromCurrencyValue}&to=${toCurrencyValue}`;
  return urlConvertAPI;
}

// Function to select element and return its value
function selectElement(id) {
  let element = document.getElementById(id);
  value = element.value;
  return value;
}

// Function to create Option Element
function createOptionElement() {
  // DocumentFragment() is like making an empty element that can be use in DOM structure
  fragment = new DocumentFragment();

  apiCountry.forEach((item, index) => {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = `${item.country}`;
    optionElement.setAttribute("value", `${item.currency_code}`);
    fragment.append(optionElement);
  });

  return fragment;
}

// apiCountry to save Country name and Currency Code Information
let apiCountry = [];

// Get Countries Name and Currency Codes Names From API
async function getCountryInformations() {
  const apiUrl =
    "https://jeffrymahbuubi.github.io/currency-api/data/src/country-by-currency-code.json";
  const response = await fetch(apiUrl);
  apiCountry = await response.json();
}

getCountryInformations();
