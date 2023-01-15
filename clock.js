const clock = document.querySelector(".clock");
const date = document.querySelector(".date");

const showTime = function () {
  const now = new Date();

  const day = `${now.getDate()}`.padStart(2, 0); //add 0 if day < 10
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = now.getFullYear();
  const hour = `${now.getHours()}`.padStart(2, 0);
  const minute = `${now.getMinutes()}`.padStart(2, 0);
  const second = `${now.getSeconds()}`.padStart(2, 0);

  clock.innerText = `${hour}:${minute}:${second}`;
  date.innerText = `${day}.${month}.${year}`;

  setTimeout(showTime, 1000);
};

showTime();
