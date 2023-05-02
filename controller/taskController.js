import * as tasksModel from "../model/tasksModel.js";
import tasksView from "../view/tasksView.js";

export const controlTasks = function () {
  tasksModel.btnNewTask.addEventListener("click", openFormTask);
  tasksModel.btnAddNewTask.addEventListener("click", createNewTask);
  document.addEventListener("click", deleteTask);
  window.addEventListener("load", getLocalStorage);
};

const openFormTask = function (e) {
  tasksView.toggleFormNewTask();
  tasksModel.openFormTask(e);
};

const createNewTask = function (e) {
  tasksModel.addNewTask(e);
  tasksView.toggleFormNewTask();
  tasksView.renderTask(tasksModel.tasksArray[tasksModel.tasksArray.length - 1]);
};

const deleteTask = function (e) {
  tasksModel.deleteTask(e);
  tasksView.deleteTask(tasksModel.deleteElement);
};

const getLocalStorage = function () {
  tasksModel.getLocalStorageTask();
  tasksModel.tasksArray.forEach((task) => tasksView.renderTask(task));
};
