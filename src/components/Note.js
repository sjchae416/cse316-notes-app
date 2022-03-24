const Note = (props) => {
  return (
    <div onClick={() => props.handleGetId(props.id)} className="note">
      <div className="preview">{props.text}</div>
      <div className="date">{props.date}</div>
    </div>
  );
};

export default Note;