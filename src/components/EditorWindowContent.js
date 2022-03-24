import { useState } from "react";

const EditorWindowContent = ({ notes, selectedNoteIndex, updateNote, setIsEditing, disabled }) => {

  const handleChange = (event) => {
    setIsEditing(true);
    updateNote(notes, event.target.value);
    // setIsEditing(false);
  }

  return (
    <div className="editor-widnow-content content" id="editor-window-bottom">
      <textarea disabled={disabled} value={selectedNoteIndex !== -1 ? notes[selectedNoteIndex]?.text ?? "" : ""} onChange={handleChange} className="note-detail" id="textarea-note"></textarea>
    </div>
  )
}

export default EditorWindowContent;