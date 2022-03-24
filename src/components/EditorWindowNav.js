import DeleteNote from "./DeleteNote";

const EditorWindowNav = (props) => {
  return (
    <div className="editor-window nav" id="editor-window-top">
      <span className="material-icons" id="icon-arrow">arrow_back</span>
      <span className="material-icons">notification_add</span>
      <span className="material-icons">person_add_alt</span>
      {/* {notes.map((note) => ( */}
      <DeleteNote notes={props.note} handleDeleteNote={props.handleDeleteNote} selectedNoteId={props.selectedNoteId} />
      {/* ))} */}
    </div>
  )
}

export default EditorWindowNav;