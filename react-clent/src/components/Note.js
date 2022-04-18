const Note = ({
	id,
	text,
	date,
	selectedNoteId,
	setIsSidebarWhenNarrowScreen,
	setNoteContentDisabled,
	stateSetSelectedNoteId,
	noteContentRef,
}) => {
	// let className = 'note';

	const handleNoteClick = (id) => {
		setIsSidebarWhenNarrowScreen(false);
		setNoteContentDisabled(false);
		stateSetSelectedNoteId(id);
		setTimeout(() => {
			noteContentRef.current.focus();
		}, 50);
		// if (this.props.isActive) {
		// 	className += 'active';
		// }
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
