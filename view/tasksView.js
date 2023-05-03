class tasksView {
  toggleFormNewTask() {
    const formNewTask = document.querySelector(".create__task");
    const textNewTask = document.querySelector(".text__new__task");
    const btnNewTask = document.querySelector(".btn__save__task");
    // formNewTask.classList.toggle("hidden");
    formNewTask.classList.toggle("smooth-height");
    textNewTask.classList.toggle("smooth-height");
    btnNewTask.classList.toggle("smooth-height");
  }
  renderTask(task) {
    const formTasks = document.querySelector(".tasks");
    const html = `
            <div class="task">
            <label class="custom-checkbox" id="${task.id}">
              <input type="checkbox"/>
              <span class="checkmark"></span>
            </label>
            <p class="task-text">${task.text}</p>
          </div>`;
    formTasks.insertAdjacentHTML("beforeend", html);
  }
  deleteTask(element) {
    if (!element) return;
    element.closest(".task").classList.add("smooth__hide");
    setTimeout(() => element.closest(".task").classList.add("hidden"), 800);
  }
}

export default new tasksView();
