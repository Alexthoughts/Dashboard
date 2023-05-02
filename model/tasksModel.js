import * as model from "./mainModel.js";

export const btnNewTask = document.querySelector(".btn__new__task");
const newTaskText = document.querySelector(".text__new__task");
export const btnAddNewTask = document.querySelector(".btn__save__task");
export const checkBox = document.querySelector(".task__content");

export let tasksArray = [];
export let deleteElement;

class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

export const openFormTask = function (e) {
  e.preventDefault();
  newTaskText.value = "";
  newTaskText.focus();
};

export const addNewTask = function (e) {
  e.preventDefault();
  const taskText = newTaskText.value;
  if (taskText.length > 0) {
    const taskId = Date.now() + "".slice(-10);
    const task = new Task(taskId, taskText);
    tasksArray.push(task);
    model.saveToLocalStorage(tasksArray, "tasksArray");
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
    model.saveToLocalStorage(tasksArray, "tasksArray");
    deleteElement = element;
  }
};

export const getLocalStorageTask = function () {
  const data = JSON.parse(localStorage.getItem("tasksArray"));
  if (!data) return;
  tasksArray = data;
};
