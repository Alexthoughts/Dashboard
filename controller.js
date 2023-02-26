import * as weatherModel from "./model/weatherModel";
import * as notesModel from "./model/notesModel";
import * as tasksModel from "./model/tasksModel";
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

const controlTasks = function () {
  window.addEventListener("load", tasksModel.getLocalStorageTask);
  tasksModel.btnNewTask.addEventListener("click", tasksModel.openFormTask);
  tasksModel.btnAddNewTask.addEventListener("click", tasksModel.addNewTask);
  document.addEventListener("click", tasksModel.deleteTask);
};

const init = function () {
  showTime();
  showWeather();
  weatherView.handleError(weatherView.hideErrorMessage);
  controlNotes();
  controlTasks();
};
init();
