const Note = ({
  id, text, date, handleClick,
}) => (
  <div
    onClick={handleClick}
    className="note"
  >
    <div className="preview">{text || 'New Note'}</div>
    <div className="date">{date}</div>
  </div>
);

export default Note;
