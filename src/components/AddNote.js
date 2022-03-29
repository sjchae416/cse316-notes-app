import { useState } from 'react';

// const [noteText, setNoteText] = useState('');

// const handleAddNote = () => {
//   if (noteText.trim().length > 0) {
//     props.addNote(noteText);
//     setNoteText('');
//   }
// }
const AddNote = ({ handleAddNote }) => (
  <span
    onClick={handleAddNote}
    className="material-icons"
    id="icon-note-add"
  >
    note_add
  </span>
);
export default AddNote;
