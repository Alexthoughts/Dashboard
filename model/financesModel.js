import { saveToLocalStorage } from "./mainModel.js";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2545cfc18amsh4fa2481df2d6a5ep13ff72jsn3d0b055227f7",
    "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
  },
};

///////////////////////-Exchange rate-/////////////////////

export const selectBoxCurrency1 = document.querySelector("#currencies__list1");
export const selectBoxCurrency2 = document.querySelector("#currencies__list2");
export const inpSearchStock = document.querySelector(".stocks__input");
export const stocksList = document.querySelector(".stocks__array");
export const btnGetBitcoinPrice = document.querySelector(".get__bitcoin__price");
export const btnGetEtherPrice = document.querySelector(".get__ether__price");

export let currency1, currency2;
export let countFinancials = 0;
export const maxFinancialCount = 7;
export let actualCurrenciesPair;

export const currencies = {
  pair: [],
};

export const getCurrencies = async function () {
  try {
    currency1 = selectBoxCurrency1.value;
    currency2 = selectBoxCurrency2.value;
    if (currency1 && currency2 && currency1 != currency2) await createCurrenciesPair();
  } catch (err) {
    throw err;
  }
};

const createCurrencyObject = function (currency1, currency2, type = "fiat") {
  currencies.pair.push({
    id: (Date.now() + "").slice(-10),
    cur1: currency1,
    cur2: currency2,
    type: type,
  });
};

const getExchangeRate = async function (currenciesPair) {
  try {
    const response = await fetch(
      `https://twelve-data1.p.rapidapi.com/price?symbol=${currenciesPair.cur1}%2F${currenciesPair.cur2}&format=json&outputsize=10`,
      options
    );
    const data = await response.json();
    currenciesPair.exchangeRate = parseFloat(data.price).toFixed(2);
    countFinancials++;
  } catch (err) {
    throw err;
  }
};

export const createCurrenciesPair = async function () {
  try {
    createCurrencyObject(currency1, currency2);
    await getExchangeRate(...currencies.pair.slice(-1));
    actualCurrenciesPair = currencies.pair.slice(-1)[0];
    if (isNaN(actualCurrenciesPair.exchangeRate))
      throw new Error(
        `Something wrong with currencyRate. currencyRate = ${actualCurrenciesPair.exchangeRate}`
      );
    saveToLocalStorage(currencies.pair, "currenciesPairArray");
  } catch (err) {
    throw err;
  }
};

///////////////////////-Stocks-/////////////////////
export const stockList = {
  stockList: [],
  selectedStocks: [],
};

export const getStockList = async function () {
  try {
    const response = await fetch(
      "https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json",
      options
    );
    countFinancials++;
    const data = await response.json();
    if (!data) throw err;
    for (let d = 0; d < data.data.length; d++) {
      stockList.stockList.push(data.data[d].symbol);
    }
  } catch (err) {
    throw err;
  }
};

const addStockInObject = function (symbol) {
  stockList.selectedStocks.push({
    id: (Date.now() + "").slice(-10),
    symbol: symbol,
  });
};

export const selectStock = async function () {
  try {
    const selectedStock = inpSearchStock.value.toUpperCase();
    if (!selectedStock) return;
    addStockInObject(selectedStock);
    await getStockPrice(...stockList.selectedStocks.slice(-1));
    saveToLocalStorage(stockList.selectedStocks, "stocksArray");
    inpSearchStock.value = "";
  } catch (err) {
    throw err;
  }
};

const getStockPrice = async function (stock) {
  try {
    const response = await fetch(
      `https://twelve-data1.p.rapidapi.com/price?symbol=${stock.symbol}&format=json&outputsize=30`,
      options
    );
    const data = await response.json();
    countFinancials++;
    if (isNaN(data.price)) throw new Error("Sorry, price for this stock is unavaiable");
    stock.price = parseFloat(data.price).toFixed(2);
  } catch (err) {
    throw err;
  }
};

///////////////////////-Crypto-/////////////////////
export const getCryptocurrencyPrice = async function (e) {
  const element = e.target;
  if (element.classList.contains("get__bitcoin__price")) {
    createCurrencyObject("BTC", "USD", "crypto");
  } else if (element.classList.contains("get__ether__price")) {
    createCurrencyObject("ETH", "USD", "crypto");
  }
  try {
    await getExchangeRate(...currencies.pair.slice(-1));
    saveToLocalStorage(currencies.pair, "currenciesPairArray");
  } catch (err) {
    throw err;
  }
};

///////////////////////-Delete-/////////////////////

export const deleteFromFinance = function (e) {
  const element = e.target;
  if (!element.classList.contains("delete__from__finance__list")) return;
  if (element.closest(".currencies__pair__stock")) {
    const financialEl = element.closest(".currencies__pair__stock");
    const stockIndex = stockList.selectedStocks.findIndex(
      (stock) => stock.id === financialEl.id
    );
    stockList.selectedStocks.splice(stockIndex, 1);
    saveToLocalStorage(stockList.selectedStocks, "stocksArray");
    financialEl.remove();
    countFinancials--;
  } else if (element.closest(".currencies__pair__currencies")) {
    const financialEl = element.closest(".currencies__pair__currencies");
    const currenciesPairIndex = currencies.pair.findIndex(
      (currenciesPair) => currenciesPair.id === financialEl.id
    );
    currencies.pair.splice(currenciesPairIndex, 1);
    saveToLocalStorage(currencies.pair, "currenciesPairArray");
    financialEl.remove();
    countFinancials--;
  }
};

///////////////////////-Local storage-/////////////////////
export const getLocalStorageStocks = async function () {
  try {
    const data = JSON.parse(localStorage.getItem("stocksArray"));
    if (!data) return;
    data.forEach((stock) => stockList.selectedStocks.push(stock));
    await Promise.all(
      stockList.selectedStocks.map(async (stock) => await getStockPrice(stock))
    );
  } catch (err) {
    throw err;
  }
};

export const getLocalStorageFiat = async function () {
  try {
    const data = JSON.parse(localStorage.getItem("currenciesPairArray"));
    if (!data) return;
    data.forEach((pair) => createCurrencyObject(pair.cur1, pair.cur2, pair.type));
    await Promise.all(currencies.pair.map(async (pair) => await getExchangeRate(pair)));
  } catch (err) {
    throw err;
  }
};
