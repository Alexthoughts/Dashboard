const optionsWeather = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2545cfc18amsh4fa2481df2d6a5ep13ff72jsn3d0b055227f7",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

export let data;

const getCurrentPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getWeather = async function () {
  try {
    const pos = await getCurrentPosition();
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const response = await fetch(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat},${lng}&days=2`,
      optionsWeather
    );
    data = await response.json();
  } catch (err) {
    throw err;
  }
};
