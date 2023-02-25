const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2545cfc18amsh4fa2481df2d6a5ep13ff72jsn3d0b055227f7",
    "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
  },
};

const selectBoxCurrency1 = document.querySelector(".currencies__list1");
const selectBoxCurrency2 = document.querySelector(".currencies__list2");
const listExchangeRate = document.querySelector(
  ".currencies__exchange__rate__list"
);
const inpSearchStock = document.querySelector(".stocks__list");
const stocks = document.querySelector(".stocks__array");
const stocksRateList = document.querySelector(".stocks__rate__list");
const cryptoList = document.querySelector(".crypto__rate__list");
const btnGetBitcoinPrice = document.querySelector(".get__bitcoin__price");
const btnGetEtherPrice = document.querySelector(".get__ether__price");
const btnDelete = document.querySelector(".delete__from__finance__list");

///////////////////////-Exchange rate-/////////////////////
let currency1, currency2, currencyRate, currenciesPair;
let currenciesPairArray = [];
let countFinancials = 0;
const maxFinancialCount = 7;
const errorMessageFinancialsLimit =
  "Sorry, not possible to add more than 7 financials";
const errorMessageFinancialsCannotBeLoaded =
  "Sorry, list of stocks or some of your saved financials cannot be loaded, please add new financial/reload the page in one minute";

const CurrenciesPair = function (id, cur1, cur2, type = "fiat") {
  this.id = id;
  this.cur1 = cur1;
  this.cur2 = cur2;
  this.type = type;
};
const getCurrency1 = function (e) {
  currency1 = selectBoxCurrency1.options[e.selectedIndex].text;
  addCurrencies();
};

const getCurrency2 = function (e) {
  currency2 = selectBoxCurrency2.options[e.selectedIndex].text;
  addCurrencies();
};

const addCurrencies = function () {
  if (countFinancials < maxFinancialCount) {
    if (currency1 && currency2 && currency1 != currency2) {
      const currenciesPairId = (Date.now() + "").slice(-10); //convert to String and take the last 10 numbers
      currenciesPair = new CurrenciesPair(
        currenciesPairId,
        currency1,
        currency2
      );
      currenciesPairArray.push(currenciesPair);
      currenciesRate(currenciesPair);
      setLocalStorage(currenciesPairArray, "currenciesPairArray");
    }
  } else {
    showErrorMessage(errorMessageFinancialsLimit);
  }
};

const currenciesRate = function (currenciesPair) {
  if (countFinancials <= maxFinancialCount) {
    fetch(
      `https://twelve-data1.p.rapidapi.com/price?symbol=${currenciesPair.cur1}%2F${currenciesPair.cur2}&format=json&outputsize=10`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        currencyRate = parseFloat(data.price).toFixed(2);
        renderCurrencies(currenciesPair);
      })
      .catch((err) => {
        showErrorMessage(errorMessageFinancialsCannotBeLoaded);
        return console.error(err);
      });
  } else {
    showErrorMessage(errorMessageFinancialsLimit);
  }
};

const renderCurrencies = function (currenciesPair) {
  if (!isNaN(currencyRate)) {
    const html = `
    <div class="currencies__pair__currencies" id="${currenciesPair.id}">
        <p class="fiat__exchange__rate">${currenciesPair.cur1}/${currenciesPair.cur2} = ${currencyRate}</p>
        <button class="btn__delete delete__from__finance__list">x</button>
      </div>`;
    if (currenciesPair.type === "fiat") {
      listExchangeRate.insertAdjacentHTML("beforeend", html);
    } else if (currenciesPair.type === "crypto") {
      cryptoList.insertAdjacentHTML("beforeend", html);
    }
    countFinancials++;
  } else {
    showErrorMessage(errorMessageFinancialsCannotBeLoaded);
  }
};

///////////////////////-Stocks-/////////////////////
let stocksArray = [];
let selectedStock, selectedStockPrice;

const Stock = function (id, symbol) {
  this.id = id;
  this.symbol = symbol;
};

const getStockList = function () {
  if (countFinancials <= maxFinancialCount) {
    fetch(
      "https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        for (let d = 0; d < data.data.length; d++) {
          const stockSymbol = data.data[d].symbol;
          const html = `<option>${stockSymbol}</option>`;
          stocks.insertAdjacentHTML("beforeend", html);
        }
      })
      .catch((err) => {
        showErrorMessage(errorMessageFinancialsCannotBeLoaded);
        return console.error(err);
      });
  } else {
    showErrorMessage(errorMessageFinancialsLimit);
  }
};

const createStock = function () {
  if (countFinancials < maxFinancialCount) {
    const inpStock = inpSearchStock.value;
    const loadedStocks = stocks.childNodes;
    for (let i = 0; i < loadedStocks.length; i++) {
      if (loadedStocks[i].value === inpStock) {
        selectedStock = loadedStocks[i].value;
        const stockId = (Date.now() + "").slice(-10); //convert to String and take the last 10 numbers
        const stock = new Stock(stockId, selectedStock);
        stocksArray.push(stock);
        getStockPrice(stock);
        break;
      }
    }
  } else {
    showErrorMessage(errorMessageFinancialsLimit);
  }
};

const getStockPrice = function (stock) {
  if (countFinancials <= 8) {
    fetch(
      `https://twelve-data1.p.rapidapi.com/price?symbol=${stock.symbol}&format=json&outputsize=30`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        selectedStockPrice = parseFloat(data.price).toFixed(2);
        renderStocks(stock);
        setLocalStorage(stocksArray, "stocksArray");
        inpSearchStock.value = "";
      })
      .catch((err) => console.error(err));
  } else {
    showErrorMessage(errorMessageFinancialsLimit);
  }
};

const renderStocks = function (stock) {
  if (!isNaN(selectedStockPrice)) {
    const html = `
    <div class="currencies__pair__stock" id="${stock.id}">
            <p class="selected__stock">${stock.symbol} = ${selectedStockPrice}</p>
            <button class="btn__delete delete__from__finance__list">x</button>
          </div>`;
    stocksRateList.insertAdjacentHTML("beforeend", html);
    countFinancials++;
  } else {
    showErrorMessage(errorMessageFinancialsCannotBeLoaded);
  }
};

///////////////////////-Crypto-/////////////////////
const getCryptocurrencyPrice = function (cryptocurrencyString) {
  if (countFinancials < maxFinancialCount) {
    const currenciesPairId = (Date.now() + "").slice(-10); //convert to String and take the last 10 numbers
    currenciesPair = new CurrenciesPair(
      currenciesPairId,
      cryptocurrencyString,
      "USD",
      "crypto"
    );
    currenciesPairArray.push(currenciesPair);
    currenciesRate(currenciesPair);
    setLocalStorage(currenciesPairArray, "currenciesPairArray");
  } else {
    showErrorMessage(errorMessageFinancialsLimit);
  }
};

const getBitcoinPrice = function () {
  getCryptocurrencyPrice("BTC");
};

const getEtherPrice = function () {
  getCryptocurrencyPrice("ETH");
};

///////////////////////-Delete-/////////////////////
const deleteFromFinance = function (e) {
  const element = e.target;
  if (element.classList.contains("delete__from__finance__list")) {
    e.preventDefault();

    if (element.closest(".currencies__pair__stock")) {
      const financialEl = element.closest(".currencies__pair__stock");
      const stockIndex = stocksArray.findIndex(
        (stock) => stock.id === financialEl.id
      );
      stocksArray.splice(stockIndex, 1);
      setLocalStorage(stocksArray, "stocksArray");
      financialEl.remove();
    } else if (element.closest(".currencies__pair__currencies")) {
      const financialEl = element.closest(".currencies__pair__currencies");
      const currenciesPairIndex = currenciesPairArray.findIndex(
        (currenciesPair) => currenciesPair.id === financialEl.id
      );
      currenciesPairArray.splice(currenciesPairIndex, 1);
      setLocalStorage(currenciesPairArray, "currenciesPairArray");
      financialEl.remove();
    }
    countFinancials--;
  }
};

///////////////////////////////////////////////////////////
const checkDuplicitFinances = function () {};

///////////////////////-Local storage-/////////////////////
const setLocalStorage = function (array, storageName) {
  localStorage.setItem(storageName, JSON.stringify(array));
};

const resetLocalStorage = function (storageName) {
  localStorage.removeItem(storageName);
  return `${storageName} removed from local storage`;
};

const getLocalStorageFiat = function () {
  const data = JSON.parse(localStorage.getItem("currenciesPairArray"));
  if (!data) return;
  currenciesPairArray = data;
  currenciesPairArray.forEach((currenciesPair) => {
    currenciesRate(currenciesPair);
  });
};

const getLocalStorageFinance = function () {
  const data = JSON.parse(localStorage.getItem("stocksArray"));
  if (!data) return;
  stocksArray = data;
  stocksArray.forEach((stock) => {
    getStockPrice(stock);
  });
};

///////////////////////-Event listeners-/////////////////////
window.addEventListener("load", getLocalStorageFiat);
window.addEventListener("load", getLocalStorageFinance);
window.addEventListener("load", getStockList);
document.addEventListener("click", deleteFromFinance);
btnGetBitcoinPrice.addEventListener("click", getBitcoinPrice);
btnGetEtherPrice.addEventListener("click", getEtherPrice);
