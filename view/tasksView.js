class tasksView {
  renderTask = function (task) {
    const formTasks = document.querySelector(".tasks");
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
}

export default new tasksView();
