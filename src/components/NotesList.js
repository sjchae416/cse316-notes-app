import Note from './Note';
import { useState, useEffect } from 'react';

const NotesList = (props) => {

  const [notes, setNotes] = useState(props.notes);
  // useEffect(() => {
  //   setNotes(props.notes);
  //   console.log(props.notes);
  // }, [props.notes]);


  return (
    <div className="notes-list" >
      {notes.map((note) => (
        <Note id={note.id} text={note.text} date={note.date} />
      ))}
    </div >
  );
};

export default NotesList;