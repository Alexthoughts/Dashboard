import * as financesModel from "../model/financesModel.js";
import financesView from "../view/financesView.js";

export const controlFinances = async function () {
  financesModel.selectBoxCurrency1.addEventListener("change", () =>
    asyncFunction(addCurrenciesPair)
  );
  financesModel.selectBoxCurrency2.addEventListener("change", () =>
    asyncFunction(addCurrenciesPair)
  );
  window.addEventListener("load", () => asyncFunction(getStockList));
  financesModel.inpSearchStock.addEventListener("change", () => asyncFunction(stockRate));
  financesModel.btnGetBitcoinPrice.addEventListener("click", (e) =>
    asyncFunction(getCryptoPrice, e)
  );
  financesModel.btnGetEtherPrice.addEventListener("click", (e) =>
    asyncFunction(getCryptoPrice, e)
  );
  document.addEventListener("click", financesModel.deleteFromFinance);
  window.addEventListener("load", () => asyncFunction(getLocalStorageFiat));
  window.addEventListener("load", () => asyncFunction(getLocalStorageStock));
};

const addCurrenciesPair = async function () {
  const request = checkRequestCount();
  if (!request) return;
  try {
    await financesModel.getCurrencies();
    if (!(financesModel.currency1 === financesModel.currency2))
      financesView.renderCurrencies(financesModel.actualCurrenciesPair);
  } catch (err) {
    throw err;
  }
};

const getStockList = async function () {
  const request = checkRequestCount();
  if (!request) return;
  try {
    await financesModel.getStockList();
    financesView.renderStockList(financesModel.stockList.stockList);
  } catch (err) {
    throw err;
  }
};

const stockRate = async function () {
  const request = checkRequestCount();
  if (!request) return;
  try {
    await financesModel.selectStock();
    financesView.renderStocks(...financesModel.stockList.selectedStocks.slice(-1));
  } catch (err) {
    throw err;
  }
};

const getCryptoPrice = async function (e) {
  const request = checkRequestCount();
  if (!request) return;
  try {
    await financesModel.getCryptocurrencyPrice(e);
    financesView.renderCurrencies(...financesModel.currencies.pair.slice(-1));
  } catch (err) {
    throw err;
  }
};

const getLocalStorageFiat = async function () {
  try {
    await financesModel.getLocalStorageFiat();
    financesModel.currencies.pair.forEach((pair) => {
      financesView.renderCurrencies(pair);
    });
  } catch (err) {
    throw err;
  }
};

const getLocalStorageStock = async function () {
  try {
    await financesModel.getLocalStorageStocks();
    financesModel.stockList.selectedStocks.forEach((stock) =>
      financesView.renderStocks(stock)
    );
  } catch (err) {
    throw err;
  }
};

const checkRequestCount = function () {
  if (!(financesModel.countFinancials < financesModel.maxFinancialCount)) {
    financesView.renderError(financesView.errorMessageFinancialsLimit);
    return false;
  } else {
    return true;
  }
};

const asyncFunction = async function (handler, e) {
  try {
    await handler(e);
  } catch (err) {
    console.error("⛔⛔⛔", err);
    financesView.renderError(financesView.errorMessageFinancialsCannotBeLoaded);
  }
};
