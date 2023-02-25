import * as weatherModel from "./model/weatherModel";
import weatherView from "./view/weatherView";
import { showTime } from "./clock";

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
  showTime();
  showWeather();
  weatherView.handleError(weatherView.hideErrorMessage);
};
init();
