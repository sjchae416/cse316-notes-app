import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SidebarNav from './components/SidebarNav';
import SidebarContent from './components/SidebarContent';
import EditorWindowNav from './components/EditorWindowNav';
import EditorWindowContent from './components/EditorWindowContent';

const App = () => {
  const [notes, setNotes] = useState(() => {
    const localStorageValue = localStorage.getItem('notes');
    return localStorageValue ? JSON.parse(localStorageValue) : [{
      id: uuidv4(),
      text: "This is a note1 with a long line of text.",
      date: "3/21/2022, 8:52:17 PM",
      tags: []
    },
    {
      id: uuidv4(),
      text: "This is a note2 with a long line of text.",
      date: "3/21/2022, 8:52:17 PM",
      tags: []
    }]
  });

  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);
  const [isNoteDisabled, setIsNoteDisabled] = useState(false)

  useEffect(() => {
    if (notes.length === 0) {
      setSelectedNoteId('');
      setSelectedNoteIndex(-1);
      setIsNoteDisabled(true);
    } else if (!isEditing) {
      setSelectedNoteId(notes[notes.length - 1].id);
      setIsNoteDisabled(false);
    }
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    console.log('USEEFFECT          ' + selectedNoteId);
    if (selectedNoteId) {
      for (let i = 0; i < notes.length; i++) {
        console.log(notes[i].id);
        if (notes[i].id === selectedNoteId) {
          console.log(`i wousld be ${i}`)
          setSelectedNoteIndex(i);
          break;
        }
      }
    } else {
      setSelectedNoteIndex(-1);
    }
  }, [selectedNoteId]);

  useEffect(() => {
    console.log("---------------this is selected Note--------");
    console.log(notes[selectedNoteIndex])
  }, [selectedNoteIndex])

  const addNote = () => {
    setIsEditing(false);
    const date = new Date();
    const newNote = {
      id: uuidv4(),
      text: "New Note",
      date: date.toLocaleString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  // const getId = (onClickId) => {
  //   // console.log("e=         " + e);
  //   // console.log("e.target=         " + e.target);
  //   // console.log("e.target.id=         " + e.target.id);
  //   // console.log("e.currentTarget.id=         " + e.currentTarget.id);
  //   setSelectedNoteId(onClickId);
  //   console.log('onClickId=         ' + onClickId);
  //   console.log('selectedNoteId=         ' + selectedNoteId + '\n');
  // }

  const updateNote = (notes, text) => {
    console.log('now text-----------------')
    console.log(notes[selectedNoteIndex].text);
    const date = new Date();
    const editedNotes = [...notes];
    const editedNote = { ...notes[selectedNoteIndex], text: text, date: date.toLocaleString() };
    editedNotes[selectedNoteIndex] = editedNote;

    setNotes(editedNotes);
  }

  const deleteNote = (id) => {
    setIsEditing(false);
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className="container">
      <div className='sidebar'>
        <SidebarNav notes={notes} handleAddNote={addNote} />
        {/* <SidebarContent notes={notes} handleAddNote={addNote} handleGetId={getId} stateSetSelectedNoteId={setSelectedNoteId} /> */}
        <SidebarContent notes={notes} handleAddNote={addNote} stateSetSelectedNoteId={setSelectedNoteId} />
      </div>
      <div className='editor-window'>
        <EditorWindowNav notes={notes} handleDeleteNote={deleteNote} selectedNoteId={selectedNoteId} />
        <EditorWindowContent notes={notes} updateNote={updateNote} selectedNoteIndex={selectedNoteIndex} setIsEditing={setIsEditing} disabled={isNoteDisabled} />
        <TagArea/>
      </div>
    </div>
  );
}

export default App;