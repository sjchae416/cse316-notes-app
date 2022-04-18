import { convertDateToString } from '../utils';
const Note = ({
	index,
	text,
	lastUpdatedDate,
	setSelectedNoteIndex,
	setIsSidebarWhenNarrowScreen,
	noteContentRef,
	isSelected,
}) => {
	const handleNoteClick = () => {
		setIsSidebarWhenNarrowScreen(false);
		setSelectedNoteIndex(index);
		setTimeout(() => {
			noteContentRef.current.focus();
		}, 50);
	};

	return (
		<div
			onClick={handleNoteClick}
			className="note"
			style={{
				backgroundColor: isSelected ? 'rgb(229, 241, 253)' : 'inherit',
			}}
		>
			<div className="preview">{text || 'New Note'}</div>
			<div className="date">{convertDateToString(lastUpdatedDate)}</div>
		</div>
	);
};

export default Note;
