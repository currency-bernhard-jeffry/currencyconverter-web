const fromCurrency = document.querySelector("#from-currency");
const toCurrency = document.querySelector("#to-currency");
const converterContainer = document.querySelector("#converter-container");
const currencyInput = document.querySelector("#currency-input");
const fromResult = document.querySelector("#from-result");
const toResult = document.querySelector("#to-result");

function calculateCurrency() {
  const rate = rateData.result;
  const convertedCurrency = parseInt(currencyInput.value) * rate;
  console.log(convertedCurrency);
}

let rateData = [];
let currencyDescription = [];
async function getRateAndCurrencyDescription() {
  const responseRate = await fetch(getExchangeRateLinkAPI());
  const responseCurrencyDescription = await fetch(
    "https://api.exchangerate.host/symbols"
  );

  rateData = await responseRate.json();
  currencyDescription = await responseCurrencyDescription.json();
  calculateCurrency();
}

let fromCurrencyValue = [];
let toCurrencyValue = [];
function getExchangeRateLinkAPI() {
  // Populate the select element from-currency and to-currency with Option elements
  fromCurrency.append(createOptionElement("from"));
  toCurrency.append(createOptionElement("to"));

  chooseDefaultCurrency(fromCurrency);
  chooseDefaultCurrency(toCurrency);

  fromCurrencyValue = selectElement("from-currency");
  toCurrencyValue = selectElement("to-currency");

  const urlConvertAPI = `https://api.exchangerate.host/convert?from=${fromCurrencyValue}&to=${toCurrencyValue}`;
  return urlConvertAPI;
}

// Function to choose default option from-currency
function chooseDefaultCurrency(selectElement) {
  for (let index = 0; index < selectElement.length; index++) {
    const option = selectElement[index];
    if (option.value === "SGD" && option.classList.value === "from") {
      option.setAttribute("selected", true);
    } else if (option.value === "IDR" && option.classList.value === "to") {
      option.setAttribute("selected", true);
    }
  }
}

// Function to select element and return its value
function selectElement(id) {
  let element = document.getElementById(id);
  value = element.value;
  return value;
}

// Function to create Option Element From Currency
function createOptionElement(className) {
  // DocumentFragment() is like making an empty element that can be use in DOM structure
  fragment = new DocumentFragment();

  apiCountry.forEach((item, index) => {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = `${item.country}`;
    optionElement.setAttribute("value", `${item.currency_code}`);

    // Assign class = from and class = to respectively to fromCurrency and toCurrency element.
    if (className === "from") {
      optionElement.classList.add("from");
    } else if (className === "to") {
      optionElement.classList.add("to");
    }

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
  getExchangeRateLinkAPI();
  getRateAndCurrencyDescription();
}

getCountryInformations();
