import view from "./mainView.js";

class financesView extends view {
  listExchangeRate = document.querySelector(".currencies__exchange__rate__list");
  stocks = document.querySelector("#stocks__array");
  stocksRateList = document.querySelector(".stocks__rate__list");
  cryptoList = document.querySelector(".crypto__rate__list");

  errorMessageFinancialsLimit = "Sorry, not possible to add more than 7 financials";
  errorMessageFinancialsCannotBeLoaded =
    "Sorry, list of stocks or some of your saved financials cannot be loaded, please add new financial/reload the page in one minute";

  renderCurrencies = function (currenciesPair) {
    if (!currenciesPair || isNaN(currenciesPair.exchangeRate)) return;
    const html = `
          <div class="currencies__pair__currencies flexbox-financial" id="${currenciesPair.id}">
              <p class="fiat__exchange__rate">${currenciesPair.cur1}/${currenciesPair.cur2} = ${currenciesPair.exchangeRate}</p>
              <button class="btn__delete delete__from__finance__list">x</button>
            </div>`;
    if (currenciesPair.type === "fiat") {
      this.listExchangeRate.insertAdjacentHTML("beforeend", html);
    } else if (currenciesPair.type === "crypto") {
      this.cryptoList.insertAdjacentHTML("beforeend", html);
    }
  };

  renderStockList(stockList) {
    stockList.map((stockSymbol) => {
      this.stockListMarkup(stockSymbol);
    });
  }

  stockListMarkup(stockSymbol) {
    const html = `<option value="${stockSymbol}"></option>`;
    this.stocks.insertAdjacentHTML("beforeend", html);
  }

  renderStocks(stock) {
    if (isNaN(stock.price)) return;
    const html = `
            <div class="currencies__pair__stock flexbox-financial" id="${stock.id}">
                    <p class="selected__stock">${stock.symbol} = ${stock.price}</p>
                    <button class="btn__delete delete__from__finance__list">x</button>
                  </div>`;
    this.stocksRateList.insertAdjacentHTML("beforeend", html);
  }
}

export default new financesView();
