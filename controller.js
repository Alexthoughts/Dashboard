import * as weatherModel from "./model/weatherModel";
import * as notesModel from "./model/notesModel";
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

const controlNotes = function () {
  notesModel.btnNewNote.addEventListener("click", notesModel.addNewNoteForm);
  notesModel.btnSaveNote.addEventListener("click", notesModel.saveNote);
  document.addEventListener("click", notesModel.deleteNote);
  window.addEventListener("load", notesModel.getLocalStorage);
};

const init = function () {
  showTime();
  showWeather();
  weatherView.handleError(weatherView.hideErrorMessage);
  controlNotes();
};
init();
