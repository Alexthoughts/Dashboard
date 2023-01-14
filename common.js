const errorMessage = document.querySelector(".error__message");
const htmlErrorText = document.querySelector(".error__message__text");
const btnCloseErrorMessage = document.querySelector(".close__error__message");

const showErrorMessage = function (errorText) {
  htmlErrorText.textContent = errorText;
  errorMessage.classList.remove("hidden");
  setTimeout(hideErrorMessage, 8000);
};

const hideErrorMessage = function () {
  errorMessage.classList.add("hidden");
};

btnCloseErrorMessage.addEventListener("click", hideErrorMessage);
