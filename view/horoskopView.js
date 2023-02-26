import view from "./view";
import { checkIfClassExist } from "../model/horoskopModel";

class horoskopView extends view {
  _errorMessage = "Birhday is not selected";

  renderHoroskopTomorrow(data, displayedHoroskop) {
    const horoskopTomorrowClass = document.querySelector(".horoskop__tomorrow");
    if (!checkIfClassExist("horoskop__tomorrow")) {
      horoskopTomorrowClass.textContent += data.description;
      horoskopTomorrowClass.classList.remove("hidden");
    } else {
      if (displayedHoroskop) {
        horoskopTomorrowClass.textContent = `Tomorrow: ${data.description}`;
      }
    }
  }

  renderHoroskopToday(data, displayedHoroskop) {
    const horoskopTodayClass = document.querySelector(".horoskop__today");
    if (!checkIfClassExist("horoskop__today")) {
      horoskopTodayClass.textContent += data.description;
      horoskopTodayClass.classList.remove("hidden");
    } else {
      if (displayedHoroskop) {
        horoskopTodayClass.textContent = `Today: ${data.description}`;
      }
    }
  }

  renderSunsigne(sunsign, displayedSunsign) {
    const sunsignClass = document.querySelector(".sunsign");
    if (!checkIfClassExist("sunsign")) {
      sunsignClass.textContent += sunsign;
      sunsignClass.classList.remove("hidden");
    } else {
      if (displayedSunsign != sunsign) {
        sunsignClass.textContent = `Sunsign: ${sunsign}`;
      }
    }
  }

  renderAge(age) {
    const ageClass = document.querySelector(".age");
    if (!checkIfClassExist("age")) {
      ageClass.textContent += age;
      ageClass.classList.remove("hidden");
    } else {
      //if age dispalayed,check that birthday dosn't change
      if (displayedAge != age) {
        ageClass.textContent = `Age: ${age}`;
      }
    }
  }
}

export default new horoskopView();
