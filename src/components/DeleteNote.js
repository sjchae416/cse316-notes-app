const DeleteNote = (props) => {
  return (
    <span onClick={() => props.handleDeleteNote(props.selectedNoteId)} className="material-icons" id="icon-note-delete">delete_outline</span>
  )
}

export default DeleteNote;