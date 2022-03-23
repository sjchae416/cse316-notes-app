const DeleteNote = ({ id, handleDeleteNote }) => {
  return (
    <span onClick={() => handleDeleteNote(id)} className="material-icons" id="icon-note-delete">delete_outline</span>
  )
}

export default DeleteNote;