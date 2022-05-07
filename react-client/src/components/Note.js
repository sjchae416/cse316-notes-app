import { convertDateToString } from '../utils';
const Note = ({
	index,
	text,
	lastUpdatedDate,
	setSelectedNoteIndex,
	setIsSidebarWhenNarrowScreen,
	noteContentRef,
	isSelected,
	isSimilarNote,
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
			className={`${isSelected ? 'selected-note' : ''} ${
				isSimilarNote ? 'similar-note' : ''
			} note`}
		>
			<div className="preview">{text || 'New Note'}</div>
			<div className="date">{convertDateToString(lastUpdatedDate)}</div>
			{isSimilarNote && !isSelected && 'similar'}
		</div>
	);
};

export default Note;
