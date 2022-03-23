import DeleteNote from "./DeleteNote";

const EditorWindowNav = ({ notes, handleDeleteNote }) => {
  return (
    <div className="editor-window nav" id="editor-window-top">
      <span className="material-icons" id="icon-arrow">arrow_back</span>
      <span className="material-icons">notification_add</span>
      <span className="material-icons">person_add_alt</span>
      {notes.map((note) => (
        <DeleteNote notes={notes} id={note.id} handleDeleteNote={handleDeleteNote} />
      ))}
    </div>
  )
}

export default EditorWindowNav;