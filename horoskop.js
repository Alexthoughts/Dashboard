//Aztro API configuration
const optionsHoroskop = {
  method: "POST",
  headers: {
    "X-RapidAPI-Key": "2545cfc18amsh4fa2481df2d6a5ep13ff72jsn3d0b055227f7",
    "X-RapidAPI-Host": "sameer-kumar-aztro-v1.p.rapidapi.com",
  },
};

const inputBirthDay = document.querySelector(".inp_bith__date");
const btnSaveBirhDay = document.querySelector(".save__birth__date");
const btnCheckTheAge = document.querySelector(".btn__check__the__age");
const btnGetTheSunsign = document.querySelector(".btn__get__the__sunsign");
const btnGetHoroskop = document.querySelector(".btn__get__a__horoskop");
const recievedDataHoroskop = document.querySelector(".horoskop__info");
const ageClass = document.querySelector(".age");
const sunsignClass = document.querySelector(".sunsign");
const horoskopTodayClass = document.querySelector(".horoskop__today");
const horoskopTomorrowClass = document.querySelector(".horoskop__tomorrow");

let birthDay;
let displayedAge;
let displayedSunsign;
let displayedHoroskop = false;

const checkIfClassExist = function (stringClassName) {
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
    alert(`Birhday is not selected`);
  }
};

const saveNewBirthDate = function (e) {
  e.preventDefault();
  localStorage.setItem("birhDate", inputBirthDay.value);
};

const getBirthDayFromLocalStorage = function () {
  const data = localStorage.getItem("birhDate");
  if (!data) return;
  inputBirthDay.value = data;
};

const countAge = function () {
  const today = new Date();
  const birthDate = getBirthDay();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (!checkIfClassExist("age")) {
    ageClass.textContent += age;
    ageClass.classList.remove("hidden");
  } else {
    //if age dispalayed,check that birthday dosn't change
    if (displayedAge != age) {
      ageClass.textContent = `Age: ${age}`;
    }
  }
  displayedAge = age;
  return age;
};

const getSunsign = function () {
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
  if (!checkIfClassExist("sunsign")) {
    sunsignClass.textContent += sunsign;
    sunsignClass.classList.remove("hidden");
  } else {
    if (displayedSunsign != sunsign) {
      sunsignClass.textContent = `Sunsign: ${sunsign}`;
    }
  }
  displayedSunsign = sunsign;
  return sunsign;
};

const getHoroskopForToday = function () {
  const sunsign = getSunsign();
  fetch(
    `https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sunsign}&day=today`,
    optionsHoroskop
  )
    .then((response) => response.json())
    .then((data) => {
      if (!checkIfClassExist("horoskop__today")) {
        horoskopTodayClass.textContent += data.description;
        horoskopTodayClass.classList.remove("hidden");
      } else {
        if (displayedHoroskop) {
          horoskopTodayClass.textContent = `Today: ${data.description}`;
        }
      }
      displayedHoroskop = true;
    })
    .catch((err) => console.error(err));
};

const getHoroskopForTomorrow = function () {
  const sunsign = getSunsign();
  fetch(
    `https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sunsign}&day=tomorrow`,
    optionsHoroskop
  )
    .then((response) => response.json())
    .then((data) => {
      if (!checkIfClassExist("horoskop__tomorrow")) {
        horoskopTomorrowClass.textContent += data.description;
        horoskopTomorrowClass.classList.remove("hidden");
      } else {
        if (displayedHoroskop) {
          horoskopTomorrowClass.textContent = `Tomorrow: ${data.description}`;
        }
      }
      displayedHoroskop = true;
    })
    .catch((err) => console.error(err));
};

btnCheckTheAge.addEventListener("click", function (e) {
  e.preventDefault();
  countAge();
});

btnGetTheSunsign.addEventListener("click", function (e) {
  e.preventDefault();
  getSunsign();
});

btnGetHoroskop.addEventListener("click", function (e) {
  e.preventDefault();
  getHoroskopForToday();
  getHoroskopForTomorrow();
});

btnSaveBirhDay.addEventListener("click", saveNewBirthDate);
window.addEventListener("load", getBirthDayFromLocalStorage);
