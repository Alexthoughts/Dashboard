class notesView {
  formNewNote = document.querySelector(".form__create__new__note");

  toggleNewNoteForm() {
    this.formNewNote.classList.toggle("hidden");
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
}
export default new notesView();
