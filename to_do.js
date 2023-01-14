const btnNewTask = document.querySelector(".btn__new__task");
const formNewTask = document.querySelector(".create__task");
const newTaskText = document.querySelector(".text__new__task");
const btnAddNewTask = document.querySelector(".btn__save__task");
const formTasks = document.querySelector(".tasks");
const checkBox = document.querySelector(".task__content");

let tasksArray = [];

const Task = function (id, text) {
  this.id = id;
  this.text = text;
};

const openFormTask = function (e) {
  e.preventDefault();
  newTaskText.value = "";
  formNewTask.classList.toggle("hidden");
  newTaskText.focus();
};

const addNewTask = function (e) {
  e.preventDefault();
  const taskText = newTaskText.value;
  if (taskText.length > 0) {
    const taskId = Date.now() + "".slice(-10);
    const task = new Task(taskId, taskText);
    tasksArray.push(task);
    formNewTask.classList.add("hidden");
    renderTask(task);
    setLocalStorage(tasksArray, "tasksArray");
  }
};

const renderTask = function (task) {
  const html = `
  <div class="task">
    <label class="task__content" id="${task.id}"
          >
          <input type="checkbox"/>
          <span class="checkmark"></span>
          <p class="task__text">${task.text}</p>
        </label>
        </div>`;
  formTasks.insertAdjacentHTML("beforeend", html);
};

const deleteTask = function (e) {
  const element = e.target;
  if (
    element.classList.contains("task__text") ||
    element.classList.contains("checkmark")
  ) {
    const taskIndex = tasksArray.findIndex((el) => el.id === element.id);
    tasksArray.splice(taskIndex, 1);
    element.closest(".task").classList.add("smooth__hide");
    setTimeout(() => element.closest(".task").classList.add("hidden"), 1000);

    setLocalStorage(tasksArray, "tasksArray");
  }
};

const getLocalStorageTask = function () {
  const data = JSON.parse(localStorage.getItem("tasksArray"));
  if (!data) return;
  tasksArray = data;
  tasksArray.forEach((task) => renderTask(task));
};

window.addEventListener("load", getLocalStorageTask);
btnNewTask.addEventListener("click", openFormTask);
btnAddNewTask.addEventListener("click", addNewTask);
document.addEventListener("click", deleteTask);
