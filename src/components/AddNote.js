import { useState } from "react";

const AddNote = (props) => {
  const [noteText, setNoteText] = useState('');

  // const handleAddNote = () => {
  //   // if (noteText.trim().length > 0) {
  //   //   props.addNote(noteText);
  //   //   setNoteText('');
  //   // }
  //   // props.addNote(noteText);
  // }

  return (
    <span onClick={props.handleAddNote(noteText)} className="material-icons" id="icon-note-add">note_add</span>
  )
}

export default AddNote;