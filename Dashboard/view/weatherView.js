import view from "./mainView.js";

class weatherView extends view {
  _parentElement = document.querySelector(".block_weather");
  _errorMessage =
    "Weather can not be displayed! Please allow geolocation in your browser.";

  renderWeather(data) {
    this._clear();
    const markup = `
    <h1 class="current__location__name">Weather in ${data.location.name}</h1>
    <div class="weather__api">
      
      <div class="current-weather flexbox-center">
        <img
        src="${data.current.condition.icon}"
        class="weather__condition__icon"
        />
        <p class="current-temperature">${Math.round(data.current.temp_c)}°</p>
      </div>
          <p>Feels like: ${Math.round(data.current.feelslike_c)}°</p>
          <p>Max: ${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°</p>
          <p>Min: ${Math.round(data.forecast.forecastday[0].day.mintemp_c)}°</p>
          <p>Wind: ${data.current.wind_kph} Kph - ${data.current.wind_dir}</p>
          <p>Chance of rain: ${data.forecast.forecastday[0].day.daily_chance_of_rain}%, ${
      data.forecast.forecastday[0].day.totalprecip_mm
    } mm </p>
          <h2 class="tomorrow-text">Tomorrow</h2> 
          <div class="current-weather flexbox-center">
          <img
            src="${data.forecast.forecastday[1].day.condition.icon}"
            class="weather__condition__icon"
          />
          <p class="tomorrow-temperature">${Math.round(
            data.forecast.forecastday[1].day.maxtemp_c
          )}°/${Math.round(data.forecast.forecastday[1].day.mintemp_c)}°</p>
          </div>
          <p>Chance of rain: ${data.forecast.forecastday[1].day.daily_chance_of_rain}%, ${
      data.forecast.forecastday[1].day.totalprecip_mm
    } mm </p>        
    </div>`;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  hideWeatherBlock() {
    this._parentElement.classList.add("hidden");
  }
}

export default new weatherView();
