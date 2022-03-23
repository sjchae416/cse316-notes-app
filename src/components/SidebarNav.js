import ProfilePhotoButton from "./ProfilePhotoButton";
import { useState } from "react";

const SidebarNav = (props) => {
  const [noteText, setNoteText] = useState('');

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      props.handleAddNote(noteText);
      setNoteText('');
    }
  }

  return (
    <div className="sidebar-nav nav">
      <ProfilePhotoButton />
      <span className="sidebar-title">My Notes</span>
      <span onClick={handleSaveClick} className="material-icons" id="icon-note-add">note_add</span>
    </div>
  )
}

export default SidebarNav;