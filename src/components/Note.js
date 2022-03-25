const Note = ({ id, text, date, stateSetSelectedNoteId }) => {

  return (
    //  <div onClick={() => handleGetId(id)} className="note">
    <div onClick={() => {
      console.log(id);
      return stateSetSelectedNoteId(id);
    }} className="note">
      <div className="preview">{text || "New Note"}</div>
      <div className="date">{date}</div>
    </div>
  );
};

export default Note;