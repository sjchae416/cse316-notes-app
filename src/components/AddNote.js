import { useState } from "react";

const AddNote = (props) => {
  const [noteText, setNoteText] = useState('');

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      props.handleAddNote(noteText);
      setNoteText('');
    }
  }

  return (
    <span onClick={handleSaveClick} className="material-icons" id="icon-note-add">note_add</span>
  )
}

export default AddNote;