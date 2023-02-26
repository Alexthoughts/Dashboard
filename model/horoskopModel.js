import horoskopView from "../view/horoskopView";

//Aztro API configuration
const optionsHoroskop = {
  method: "POST",
  headers: {
    "X-RapidAPI-Key": "2545cfc18amsh4fa2481df2d6a5ep13ff72jsn3d0b055227f7",
    "X-RapidAPI-Host": "sameer-kumar-aztro-v1.p.rapidapi.com",
  },
};

const inputBirthDay = document.querySelector(".inp_bith__date");
export const btnSaveBirhDay = document.querySelector(".save__birth__date");
export const btnCheckTheAge = document.querySelector(".btn__check__the__age");
export const btnGetTheSunsign = document.querySelector(
  ".btn__get__the__sunsign"
);
export const btnGetHoroskop = document.querySelector(".btn__get__a__horoskop");
const recievedDataHoroskop = document.querySelector(".horoskop__info");

let birthDay;
let displayedAge;
let displayedSunsign = "";
let displayedHoroskop = false;

export const checkIfClassExist = function (stringClassName) {
  for (let i = 0; i < recievedDataHoroskop.childNodes.length; i++) {
    if (recievedDataHoroskop.childNodes.length > 1) {
      if (recievedDataHoroskop.childNodes[i].className == stringClassName) {
        return true;
      }
    } else {
      return false;
    }
  }
};

const getBirthDay = function () {
  birthDay = inputBirthDay.value;
  if (birthDay) {
    return new Date(birthDay); //date
  } else {
    horoskopView.renderError();
  }
};

export const saveNewBirthDate = function (e) {
  e.preventDefault();
  localStorage.setItem("birhDate", inputBirthDay.value);
};

export const getBirthDayFromLocalStorage = function () {
  const data = localStorage.getItem("birhDate");
  if (!data) return;
  inputBirthDay.value = data;
};

export const countAge = function (e) {
  e.preventDefault();
  const today = new Date();
  const birthDate = getBirthDay();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  horoskopView.renderAge(age);
  displayedAge = age;
  return age;
};

export const getSunsign = function () {
  const birthDate = getBirthDay();
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();
  let sunsign;
  if (
    (birthMonth === 1 && birthDay >= 21) ||
    (birthMonth === 2 && birthDay <= 18)
  ) {
    sunsign = "Aquarius";
  } else if (
    (birthMonth === 2 && birthDay >= 19) ||
    (birthMonth === 3 && birthDay <= 20)
  ) {
    sunsign = "Pisces";
  } else if (
    (birthMonth === 3 && birthDay >= 21) ||
    (birthMonth === 4 && birthDay <= 20)
  ) {
    sunsign = "Aries";
  } else if (
    (birthMonth === 4 && birthDay >= 21) ||
    (birthMonth === 5 && birthDay <= 20)
  ) {
    sunsign = "Taurus";
  } else if (
    (birthMonth === 5 && birthDay >= 21) ||
    (birthMonth === 6 && birthDay <= 21)
  ) {
    sunsign = "Gemini";
  } else if (
    (birthMonth === 6 && birthDay >= 22) ||
    (birthMonth === 7 && birthDay <= 22)
  ) {
    sunsign = "Cancer";
  } else if (
    (birthMonth === 7 && birthDay >= 23) ||
    (birthMonth === 8 && birthDay <= 22)
  ) {
    sunsign = "Leo";
  } else if (
    (birthMonth === 8 && birthDay >= 23) ||
    (birthMonth === 9 && birthDay <= 22)
  ) {
    sunsign = "Virgo";
  } else if (
    (birthMonth === 9 && birthDay >= 23) ||
    (birthMonth === 10 && birthDay <= 22)
  ) {
    sunsign = "Libra";
  } else if (
    (birthMonth === 10 && birthDay >= 23) ||
    (birthMonth === 11 && birthDay <= 22)
  ) {
    sunsign = "Scorpio";
  } else if (
    (birthMonth === 11 && birthDay >= 23) ||
    (birthMonth === 12 && birthDay <= 21)
  ) {
    sunsign = "Sagittarius";
  } else if (
    (birthMonth === 12 && birthDay >= 22) ||
    (birthMonth === 1 && birthDay <= 20)
  ) {
    sunsign = "Capricorn";
  }
  horoskopView.renderSunsigne(sunsign);
  displayedSunsign = sunsign;
  return sunsign;
};

export const getHoroskopForToday = async function () {
  try {
    const sunsign = getSunsign();
    const response = await fetch(
      `https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sunsign}&day=today`,
      optionsHoroskop
    );
    const data = await response.json();
    horoskopView.renderHoroskopToday(data, displayedHoroskop);
    displayedHoroskop = true;
  } catch (err) {
    console.error(err);
  }
};

export const getHoroskopForTomorrow = async function () {
  try {
    const sunsign = getSunsign();
    const response = await fetch(
      `https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sunsign}&day=tomorrow`,
      optionsHoroskop
    );
    const data = await response.json();
    horoskopView.renderHoroskopTomorrow(data, displayedHoroskop);
    displayedHoroskop = true;
  } catch (err) {
    console.error(err);
  }
};
