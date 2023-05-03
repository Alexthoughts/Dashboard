class notesView {
  formNewNote = document.querySelector(".form__create__new__note");
  textNewNote = document.querySelector(".text__new__note");
  saveNewNote = document.querySelector(".btn__save__note");

  toggleNewNoteForm() {
    this.formNewNote.classList.toggle("smooth-height");
    this.textNewNote.classList.toggle("smooth-height");
    this.saveNewNote.classList.toggle("smooth-height");
  }

  renderNote(note) {
    const notes = document.querySelector(".notes");
    const html = `
          <div class="note" id="${note.id}">
          <textarea class="note__text" readonly>
        ${note.text}</textarea>
        <button class="btn__delete btn__delete__note">x</button>
        </div>`;
    notes.insertAdjacentHTML("beforeend", html);
  }

  deleteNote(element) {
    if (!element) return;
    element.closest(".note").classList.add("smooth-height");
    setTimeout(() => element.closest(".note").classList.add("hidden"), 300);
  }
}
export default new notesView();
