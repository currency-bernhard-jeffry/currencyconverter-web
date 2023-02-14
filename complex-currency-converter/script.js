const fromCurrency = document.querySelector("#from-currency");
const toCurrency = document.querySelector("#to-currency");
const converterContainer = document.querySelector("#converter-container");
const currencyInput = document.querySelector("#currency-input");
const fromResult = document.querySelector("#from-result");
const toResult = document.querySelector("#to-result");
const convertButton = document.querySelector("#convert");

// countryAndCurrencyCodeDatas to save Country name, Currency Code, Currency Name fetch from API
let countryAndCurrencyCodeDatas = [];

// rateData to save rate data fetch from API
let rateData = [];

function calculateCurrency() {
  const rate = rateData.result;
  const convertedCurrency = parseInt(currencyInput.value) * rate;
  fromResult.innerHTML = `${parseInt(currencyInput.value).toPrecision(
    3
  )} - ${selectOptionToGetValue("from-currency")}`;
  toResult.innerHTML = `${convertedCurrency.toFixed(
    2
  )} - ${selectOptionToGetValue("to-currency")}`;
}

async function getRate() {
  const response = await fetch(getExchangeRateLinkAPI());
  rateData = await response.json();
  getExchangeRateLinkAPI();
  calculateCurrency();
}

function getExchangeRateLinkAPI() {
  // Populate the select element from-currency and to-currency with Option elements
  fromCurrency.append(createOptionElement("from"));
  toCurrency.append(createOptionElement("to"));

  chooseDefaultCurrency(fromCurrency);
  chooseDefaultCurrency(toCurrency);

  const fromCurrencyValue = selectOptionToGetValue("from-currency");
  const toCurrencyValue = selectOptionToGetValue("to-currency");

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
function selectOptionToGetValue(id) {
  let element = document.getElementById(id);
  value = element.value;
  return value;
}

// Function to create Option Element From Currency
function createOptionElement(className) {
  // DocumentFragment() is like making an empty element that can be use in DOM structure
  fragment = new DocumentFragment();

  countryAndCurrencyCodeDatas.forEach((item, index) => {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = `${item.country} - ${item.currency_name}`;
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

// Get Countries Name and Currency Codes Names From API
async function getCountryAndCurrencyCodeDatas() {
  const apiUrl =
    "https://jeffrymahbuubi.github.io/currency-api/data/src/country-by-currency-code.json";
  const response = await fetch(apiUrl);
  countryAndCurrencyCodeDatas = await response.json();
  getExchangeRateLinkAPI();
  getRate();
  calculateCurrency();
}

function runApp() {
  getCountryAndCurrencyCodeDatas();
  convertButton.addEventListener("click", calculateCurrency);
  converterContainer.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateCurrency();
  });
}

runApp();

for (let index = 0; index < array.length; index++) {
  const element = array[index];
  
}