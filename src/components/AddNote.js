import { useState } from "react";

const AddNote = (props) => {
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    // if (noteText.trim().length > 0) {
    //   props.addNote(noteText);
    //   setNoteText('');
    // }
  }

  return (
    <span onClick={props.handleAddNote} className="material-icons" id="icon-note-add">note_add</span>
  )
}

export default AddNote;