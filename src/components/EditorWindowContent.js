import { useState } from "react";

const EditorWindowContent = (props) => {
  const [noteText, setNoteText] = useState('');

  const handleChange = (event) => {
    setNoteText(event.target.value);
    // console.log(noteText);
    console.log(props.notes[0].text);
    // props.notes[0].text = noteText;
    props.updateNote(props.notes, noteText, 0);
  }

  return (
    <div className="editor-widnow-content content" id="editor-window-bottom">
      <textarea onChange={handleChange} className="note-detail" id="textarea-note" placeholder="type your note here...."></textarea>
    </div>
  )
}

export default EditorWindowContent;