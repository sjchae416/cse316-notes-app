const Note = ({
	id,
	text,
	date,
	setIsSidebarWhenNarrowScreen,
	setNoteContentDisabled,
	stateSetSelectedNoteId,
	noteContentRef,
}) => {
	const handleNoteClick = (id) => {
		setIsSidebarWhenNarrowScreen(false);
		setNoteContentDisabled(false);
		stateSetSelectedNoteId(id);
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
			<div className="date">{date}</div>
		</div>
	);
};

export default Note;
