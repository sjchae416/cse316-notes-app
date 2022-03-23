const Note = ({ id, text, date }) => {
  return (
    <div className="note">
      <div className="preview">{text}</div>
      <div className="date">{date}</div>
    </div>
  );
};

export default Note;