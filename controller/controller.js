import { showTime } from "../model/clockModel";
import { controlHoroskop } from "./horoskopController";
import { showWeather } from "./weatherController";
import { controlNotes } from "./notesController";
import { controlTasks } from "./taskController";
import { controlFinances } from "./financesController";
import financesView from "../view/financesView";

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
