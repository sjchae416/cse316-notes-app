const DeleteNote = ({ handleDeleteNote, selectedNoteId }) => (
  <span
    onClick={() => handleDeleteNote(selectedNoteId)}
    className="material-icons"
    id="icon-note-delete"
  >
    delete_outline
  </span>
);

export default DeleteNote;
