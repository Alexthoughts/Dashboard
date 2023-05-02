import * as weatherModel from "../model/weatherModel.js";
import weatherView from "../view/weatherView.js";

export const showWeather = async function () {
  try {
    weatherView.renderSpinner();
    await weatherModel.getWeather();
    weatherView.renderWeather(weatherModel.data);
  } catch (err) {
    weatherView.hideWeatherBlock();
    console.error(err);
    weatherView.renderError();
  }
};
