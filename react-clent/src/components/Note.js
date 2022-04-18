import { convertDateToString } from '../utils';
const Note = ({
	index,
	text,
	lastUpdatedDate,
	setSelectedNoteIndex,
	setIsSidebarWhenNarrowScreen,
	noteContentRef,
}) => {
	const handleNoteClick = () => {
		setIsSidebarWhenNarrowScreen(false);
		setSelectedNoteIndex(index);
		setTimeout(() => {
			noteContentRef.current.focus();
		}, 50);
	};

	return (
		<div onClick={handleNoteClick} className="note">
			<div className="preview">{text || 'New Note'}</div>
			<div className="date">{convertDateToString(lastUpdatedDate)}</div>
		</div>
	);
};

export default Note;
