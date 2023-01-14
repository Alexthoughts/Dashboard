const hideAll = document.querySelector(".hide__all");

const showPage = function () {
  setTimeout(() => {
    hideAll.style.display = "none";
  }, 100);
};

window.addEventListener("load", showPage);
