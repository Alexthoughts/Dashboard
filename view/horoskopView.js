import view from "./mainView.js";

class horoskopView extends view {
  renderHoroskopTomorrow(data) {
    if (!data.description) return;
    const horoskopTomorrowClass = document.querySelector(".horoskop__tomorrow");
    horoskopTomorrowClass.textContent = `Tomorrow: ${data.description}`;
    horoskopTomorrowClass.classList.remove("hidden");
  }

  renderHoroskopToday(data) {
    if (!data.description) return;
    const horoskopTodayClass = document.querySelector(".horoskop__today");
    horoskopTodayClass.textContent = `Today: ${data.description}`;
    horoskopTodayClass.classList.remove("hidden");
  }

  renderSunsigne(sunsign) {
    if (!sunsign) return;
    const sunsignClass = document.querySelector(".sunsign");
    sunsignClass.textContent = `Sunsign: ${sunsign}`;
    sunsignClass.classList.remove("hidden");
  }

  renderAge(age) {
    if (!age) return;
    const ageClass = document.querySelector(".age");
    ageClass.textContent = `Age: ${age}`;
    ageClass.classList.remove("hidden");
  }
}

export default new horoskopView();
