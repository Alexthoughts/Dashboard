import * as weatherModel from "./model/weatherModel";
import weatherView from "./view/weatherView";

const showWeather = async function () {
  try {
    weatherView.renderSpinner();
    await weatherModel.getWeather();
    weatherView.renderWeather(weatherModel.data);
  } catch (err) {
    weatherView.hideWeatherBlock();
    console.error("⛔⛔⛔" + err);
    weatherView.renderError();
  }
};

const init = function () {
  showWeather();
  weatherView.handleError(weatherView.hideErrorMessage);
};
init();
