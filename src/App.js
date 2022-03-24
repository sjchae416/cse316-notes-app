import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SidebarNav from './components/SidebarNav';
import SidebarContent from './components/SidebarContent';
import EditorWindowNav from './components/EditorWindowNav';
import EditorWindowContent from './components/EditorWindowContent';


const App = () => {
  const [notes, setNotes] = useState([{
    id: uuidv4(),
    text: "This is a note1 with a long line of text.",
    date: "3/21/22, 8:52:17 PM"
  },
  {
    id: uuidv4(),
    text: "This is a note2 with a long line of text.",
    date: "3/21/22, 8:52:17 PM"
  },
  ]);

  useEffect(() => {
    console.log("APP USE_EFFECT")
  }, [notes]);

  useEffect(() => {
    console.log("APP USE_EFFECT")
  }, [selectedNoteId]);

  const addNote = () => {
    const date = new Date();
    const newNote = {
      id: uuidv4(),
      text: "New Note",
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  var selectedNoteId = '';

  const getId = (onClickId) => {
    // console.log("e=         " + e);
    // console.log("e.target=         " + e.target);
    // console.log("e.target.id=         " + e.target.id);
    // console.log("e.currentTarget.id=         " + e.currentTarget.id);
    selectedNoteId = onClickId;
    console.log('onClickId=         ' + onClickId);
    console.log('selectedNoteId=         ' + selectedNoteId);
  }

  const selectNote = () => {
  }

  const updateNote = (notes, text, i) => {
    console.log(notes[i].text);
    notes[i].text = text;

    let newNotes = notes.slice();
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  }

  return (
    <div className="container">
      <div className='sidebar'>
        <SidebarNav notes={notes} handleAddNote={addNote} />
        <SidebarContent notes={notes} handleAddNote={addNote} handleSelectNote={selectNote} handleGetId={getId} />
      </div>
      <div className='editor-window'>
        <EditorWindowNav notes={notes} handleDeleteNote={deleteNote} selectedNoteId={selectedNoteId} />
        <EditorWindowContent notes={notes} updateNote={updateNote} />
      </div>
    </div>
  );
}

export default App;