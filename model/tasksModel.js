import tasksView from "../view/tasksView";
import * as model from "./model";

export const btnNewTask = document.querySelector(".btn__new__task");
const formNewTask = document.querySelector(".create__task");
const newTaskText = document.querySelector(".text__new__task");
export const btnAddNewTask = document.querySelector(".btn__save__task");
export const checkBox = document.querySelector(".task__content");

let tasksArray = [];

class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

export const openFormTask = function (e) {
  e.preventDefault();
  newTaskText.value = "";
  formNewTask.classList.toggle("hidden");
  newTaskText.focus();
};

export const addNewTask = function (e) {
  e.preventDefault();
  const taskText = newTaskText.value;
  if (taskText.length > 0) {
    const taskId = Date.now() + "".slice(-10);
    const task = new Task(taskId, taskText);
    tasksArray.push(task);
    formNewTask.classList.add("hidden");
    tasksView.renderTask(task);
    model.setLocalStorage(tasksArray, "tasksArray");
  }
};

export const deleteTask = function (e) {
  const element = e.target;
  if (
    element.classList.contains("task__text") ||
    element.classList.contains("checkmark")
  ) {
    const taskIndex = tasksArray.findIndex((el) => el.id === element.id);
    tasksArray.splice(taskIndex, 1);
    element.closest(".task").classList.add("smooth__hide");
    setTimeout(() => element.closest(".task").classList.add("hidden"), 1000);

    model.setLocalStorage(tasksArray, "tasksArray");
  }
};

export const getLocalStorageTask = function () {
  const data = JSON.parse(localStorage.getItem("tasksArray"));
  if (!data) return;
  tasksArray = data;
  tasksArray.forEach((task) => tasksView.renderTask(task));
};
