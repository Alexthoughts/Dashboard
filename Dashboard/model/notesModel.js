import * as model from "./mainModel.js";

export const btnNewNote = document.querySelector(".btn__new__note");
const textNewNote = document.querySelector(".text__new__note");
export const btnSaveNote = document.querySelector(".btn__save__note");

export let notesArray = [];

class Note {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

export const addNewNoteForm = function (e) {
  e.preventDefault();
  textNewNote.value = "";
  textNewNote.focus();
};

export const saveNote = function (e) {
  e.preventDefault();
  const noteId = (Date.now() + "").slice(-10); //convert to String and take the last 10 numbers
  const noteText = textNewNote.value;
  if (noteText.length > 0) {
    const note = new Note(noteId, noteText);
    notesArray.push(note);
    model.saveToLocalStorage(notesArray, "notesArray");
  }
};

export const deleteNote = function (e) {
  const element = e.target;
  if (!element.classList.contains("btn__delete__note")) return;
  const noteEl = element.closest(".note");
  const noteIndex = notesArray.findIndex((note) => note.id === noteEl.id);
  notesArray.splice(noteIndex, 1);
  noteEl.remove();
  model.saveToLocalStorage(notesArray, "notesArray");
};

export const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("notesArray"));
  if (!data) return;
  notesArray = data;
};
