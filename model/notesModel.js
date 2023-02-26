import * as model from "./model";
import notesView from "../view/notesView";

export const btnNewNote = document.querySelector(".btn__new__note");
const formNewNote = document.querySelector(".form__create__new__note");
const textNewNote = document.querySelector(".text__new__note");
export const btnSaveNote = document.querySelector(".btn__save__note");

let notesArray = [];
let note;

class Note {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

export const addNewNoteForm = function (e) {
  e.preventDefault();
  textNewNote.value = "";
  formNewNote.classList.toggle("hidden");
  textNewNote.focus();
};

export const saveNote = function (e) {
  e.preventDefault();
  const noteId = (Date.now() + "").slice(-10); //convert to String and take the last 10 numbers
  const noteText = textNewNote.value;
  if (noteText.length > 0) {
    note = new Note(noteId, noteText);
    notesArray.push(note);
    formNewNote.classList.add("hidden");
    notesView.renderNote(note);
    model.setLocalStorage(notesArray, "notesArray");
  }
};

export const deleteNote = function (e) {
  const element = e.target;
  if (element.classList.contains("btn__delete__note")) {
    e.preventDefault();
    const noteEl = element.closest(".note");
    const noteIndex = notesArray.findIndex((note) => note.id === noteEl.id);
    notesArray.splice(noteIndex, 1);
    noteEl.remove();

    model.setLocalStorage(notesArray, "notesArray");
  }
  return;
};

export const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("notesArray"));
  if (!data) return;
  notesArray = data;
  notesArray.forEach((note) => {
    notesView.renderNote(note);
  });
};
