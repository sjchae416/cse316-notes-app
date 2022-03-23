import { useState } from "react";
const EditorWindowContent = () => {
  const [noteText, setNoteText] = useState('');

  const handleChange = (event) => {
    setNoteText(event.target.value);
  }

  return (
    <div className="editor-widnow-content content" id="editor-window-bottom">
      <textarea onChange={handleChange} className="note-detail" id="textarea-note" placeholder="type your note here...."></textarea>
    </div>
  )
}

export default EditorWindowContent;