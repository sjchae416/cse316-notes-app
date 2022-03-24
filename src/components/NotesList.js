import Note from './Note';
import { useState, useEffect } from 'react';

const NotesList = ({ notes, stateSetSelectedNoteId }) => {
  // const [notes, setNotes] = useState(props.notes);
  // useEffect(() => {
  //   setNotes(props.notes);
  //   console.log(props.notes);
  // }, [props.notes]);



  return (
    <div className="notes-list" >
      {notes.slice(0).reverse().map((note) => (
        // <Note key={note.id} id={note.id} text={note.text} date={note.date} handleGetId={handleGetId} stateSetSelectedNoteId={stateSetSelectedNoteId} />
        <Note key={note.id} id={note.id} text={note.text} date={note.date} stateSetSelectedNoteId={stateSetSelectedNoteId} />
      ))}
    </div >
  );
};

export default NotesList;