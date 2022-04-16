const Note = ({
	id,
	text,
	date,
	handleClick,
	selectedNoteId,
	setIsSidebarWhenNarrowScreen,
	setNoteContentDisabled,
	stateSetSelectedNoteId,
	noteContentRef,
}) => {
	const handleNoteClick = (id) => {
		setIsSidebarWhenNarrowScreen(false);
		setNoteContentDisabled(false);
		stateSetSelectedNoteId(id);
		console.log('Note.js ; handleNoteClick ; id:      ' + id);
		console.log(
			'Note.js ; handleNoteClick ; selectedNoteId:     ' + selectedNoteId
		);

		setTimeout(() => {
			noteContentRef.current.focus();
		}, 50);
	};

	return (
		<div
			onClick={() => {
				handleNoteClick(id);
			}}
			className="note"
		>
			<div className="preview">{text || 'New Note'}</div>
			<div className="date">{date.toLocaleString()}</div>
		</div>
	);
};

export default Note;
