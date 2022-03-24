import Note from './Note';
import { useState, useEffect } from 'react';

const NotesList = (props) => {
  // const [notes, setNotes] = useState(props.notes);
  // useEffect(() => {
  //   setNotes(props.notes);
  //   console.log(props.notes);
  // }, [props.notes]);

  return (
    <div className="notes-list" >
      {props.notes.map((note) => (
        <Note id={note.id} text={note.text} date={note.date} handleSelectNote={props.handleSelectNote} handleGetId={props.handleGetId} />
      ))}
    </div >
  );
};

export default NotesList;