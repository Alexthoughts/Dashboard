import view from "./view";

class weatherView extends view {
  _parentElement = document.querySelector(".block_weather");
  _errorMessage =
    "Weather can not be displayed! Please allow geolocation in your browser.";

  renderWeather(data) {
    this._clear();
    const markup = `
    <h1 class="current__location__name">Weather in ${data.location.name}</h1>
    <div class="weather__api">
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
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  hideWeatherBlock() {
    this._parentElement.classList.add("hidden");
  }
}

export default new weatherView();
