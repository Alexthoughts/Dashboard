import { showTime } from "../model/clockModel.js";
import { controlHoroskop } from "./horoskopController.js";
import { showWeather } from "./weatherController.js";
import { controlNotes } from "./notesController.js";
import { controlTasks } from "./taskController.js";
import { controlFinances } from "./financesController.js";
import financesView from "../view/financesView.js";

const init = function () {
  showTime();
  controlHoroskop();
  showWeather();
  controlNotes();
  controlTasks();
  controlFinances();
  financesView.handleError(financesView.hideErrorMessage);
};
init();
