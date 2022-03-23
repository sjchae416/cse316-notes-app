import { useState } from 'react';
// import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';
// import Icon from '@mui/material/Icon';
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

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: uuidv4(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
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
        <SidebarContent notes={notes} handleAddNote={addNote} />
      </div>
      <div className='editor-window'>
        <EditorWindowNav notes={notes} handleDeleteNote={deleteNote} />
        <EditorWindowContent notes={notes} handleAddNote={addNote} />
      </div>
    </div>
  );
}

export default App;