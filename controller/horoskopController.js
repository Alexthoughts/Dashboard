import * as horoskopModel from "../model/horoskopModel.js";
import horoskopView from "../view/horoskopView.js";

const displayAge = function (e) {
  horoskopModel.countAge(e);
  horoskopView.renderAge(horoskopModel.horoskopData.age);
};

const displaySunsign = function (e) {
  e.preventDefault();
  horoskopModel.getSunsign();
  horoskopView.renderSunsigne(horoskopModel.horoskopData.sunsign);
};

const displayHoroskop = async function (e) {
  e.preventDefault();
  try {
    await horoskopModel.getHoroskopForToday();
    await horoskopModel.getHoroskopForTomorrow();
    horoskopView.renderSunsigne(horoskopModel.horoskopData.sunsign);
    horoskopView.renderHoroskopToday(horoskopModel.horoskopData.horoskopToday);
    horoskopView.renderHoroskopTomorrow(horoskopModel.horoskopData.horoskopTomorrow);
  } catch (err) {
    console.error(err);
  }
};

export const controlHoroskop = function () {
  horoskopModel.btnCheckTheAge.addEventListener("click", displayAge);
  horoskopModel.btnGetTheSunsign.addEventListener("click", displaySunsign);
  horoskopModel.btnGetHoroskop.addEventListener("click", displayHoroskop);
  horoskopModel.btnSaveBirhDay.addEventListener("click", horoskopModel.saveNewBirthDate);
  window.addEventListener("load", horoskopModel.getBirthDayFromLocalStorage);
};
