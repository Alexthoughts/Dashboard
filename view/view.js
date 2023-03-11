import { DISPLAY_ERROR_TIME } from "../config";

export default class view {
  errors = document.querySelector(".errors");
  btnHideError = document.querySelector(".close__error__message");

  renderSpinner() {
    const markup = `
    <span class="loader"></span>
    `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(errorMessage = this._errorMessage) {
    const markup = `
    <div class="error__message">
        <button class="close__error__message btn__delete">x</button>
        <p class="error__message__text"> ${errorMessage}</p>
    </div>`;
    this.errors.insertAdjacentHTML("beforeend", markup);
    setTimeout(this.hideErrorMessage, DISPLAY_ERROR_TIME * 1000);
  }

  hideErrorMessage() {
    document.querySelector(".error__message").classList.add("hidden");
  }

  handleError() {
    document.addEventListener("click", function (e) {
      const btn = e.target;
      if (btn.classList.contains("close__error__message")) {
        btn.closest(".error__message").classList.add("hidden");
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
