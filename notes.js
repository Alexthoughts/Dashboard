const btnNewNote = document.querySelector(".btn__new__note");
const formNewNote = document.querySelector(".form__create__new__note");
const textNewNote = document.querySelector(".text__new__note");
const btnSaveNote = document.querySelector(".btn__save__note");
const btnDeleteNote = document.querySelector(".btn__delete__note");
const notes = document.querySelector(".notes");

let notesArray = [];
let note;

const Note = function (id, text) {
  this.id = id;
  this.text = text;
};

const addNewNoteForm = function (e) {
  e.preventDefault();
  textNewNote.value = "";
  formNewNote.classList.toggle("hidden");
  textNewNote.focus();
};

const saveNote = function (e) {
  e.preventDefault();
  const noteId = (Date.now() + "").slice(-10); //convert to String and take the last 10 numbers
  const noteText = textNewNote.value;
  if (noteText.length > 0) {
    note = new Note(noteId, noteText);
    notesArray.push(note);
    formNewNote.classList.add("hidden");
    renderNote(note);
    setLocalStorage(notesArray, "notesArray");
  }
};

const deleteNote = function (e) {
  const element = e.target;
  if (element.classList.contains("btn__delete__note")) {
    e.preventDefault();
    const noteEl = element.closest(".note");
    const noteIndex = notesArray.findIndex((note) => note.id === noteEl.id);
    notesArray.splice(noteIndex, 1);
    noteEl.remove();

    setLocalStorage(notesArray, "notesArray");
  }
  return;
};

const renderNote = function (note) {
  const html = `
    <div class="note" id="${note.id}">
    <textarea class="note__text" readonly>
  ${note.text}</textarea>
    <button class="btn__delete btn__delete__note">x</button>
  </div>`;
  notes.insertAdjacentHTML("beforeend", html);
};

const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("notesArray"));
  if (!data) return;
  notesArray = data;
  notesArray.forEach((note) => {
    renderNote(note);
  });
};

window.addEventListener("load", getLocalStorage);

btnNewNote.addEventListener("click", addNewNoteForm);

btnSaveNote.addEventListener("click", saveNote);

document.addEventListener("click", deleteNote);
