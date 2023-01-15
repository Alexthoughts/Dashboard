const optionsWeather = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2545cfc18amsh4fa2481df2d6a5ep13ff72jsn3d0b055227f7",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

const weatherBlock = document.querySelector(".block_weather");
const currentLocation = document.querySelector(".current__location__name");

const getCurrentPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getWeather = function () {
  getCurrentPosition().then((pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    return fetch(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat},${lng}&days=2`,
      optionsWeather
    )
      .then((response) => response.json())
      .then((data) => {
        currentLocation.textContent += ` ${data.location.name}`;
        weatherBlock.classList.remove("hidden");
        const html = `<div class="weather__api">
        <img
          src="${data.current.condition.icon}"
          class="weather__condition__icon"
        />
        <p>Temperature: ${data.current.temp_c} °C</p>
        <p>Feels like: ${data.current.feelslike_c} °C</p>
        <p>Wind: ${data.current.wind_kph} Kph - ${data.current.wind_dir}</p>
        <p>Max: ${data.forecast.forecastday[0].day.maxtemp_c} °C</p>
        <p>Min: ${data.forecast.forecastday[0].day.mintemp_c} °C</p>
        <p>Chance of rain: ${data.forecast.forecastday[0].day.daily_chance_of_rain}%, ${data.forecast.forecastday[0].day.totalprecip_mm} mm </p>
        <h2>Tomorrow</h2> 
        <img
          src="${data.forecast.forecastday[1].day.condition.icon}"
          class="weather__condition__icon"
        />
        <p>Max: ${data.forecast.forecastday[1].day.maxtemp_c} °C</p>
        <p>Min: ${data.forecast.forecastday[1].day.mintemp_c} °C</p>
        <p>Chance of rain: ${data.forecast.forecastday[1].day.daily_chance_of_rain}%, ${data.forecast.forecastday[1].day.totalprecip_mm} mm </p>        
      </div>`;
        currentLocation.insertAdjacentHTML("beforeend", html);
      })
      .catch((err) => console.error(err));
  });
};

getWeather();
