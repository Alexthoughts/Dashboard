const clock = document.querySelector(".clock");

const showTime = function () {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hour = hours < 10 ? "0" + hours : hours;
  const minute = minutes < 10 ? "0" + minutes : minutes;
  const second = seconds < 10 ? "0" + seconds : seconds;

  clock.innerText = `${hour}:${minute}:${second}`;

  setTimeout(showTime, 1000);
};

showTime();
