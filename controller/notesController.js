import * as notesModel from "../model/notesModel.js";
import notesView from "../view/notesView.js";

export const controlNotes = function () {
  notesModel.btnNewNote.addEventListener("click", addNewNoteForm);
  notesModel.btnSaveNote.addEventListener("click", createNewNote);
  document.addEventListener("click", deleteNote);
  window.addEventListener("load", getLocalStorage);
};

const addNewNoteForm = function (e) {
  notesView.toggleNewNoteForm();
  notesModel.addNewNoteForm(e);
};

const createNewNote = function (e) {
  notesModel.saveNote(e);
  notesView.renderNote(notesModel.notesArray[notesModel.notesArray.length - 1]);
  notesView.toggleNewNoteForm();
};

const deleteNote = function (e) {
  notesModel.deleteNote(e);
  notesView.deleteNote(notesModel.deleteElement);
};

const getLocalStorage = function () {
  notesModel.getLocalStorage();
  notesModel.notesArray.forEach((note) => {
    notesView.renderNote(note);
  });
};
