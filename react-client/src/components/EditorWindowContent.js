import TagArea from './TagArea';

function EditorWindowContent({
	notes,
	selectedNoteIndex,
	updateNote,
	disabled,
	noteContentRef,
	tags,
	handleDelete,
	handleAddition,
	handleDrag,
	handleTagClick,
	selectedNoteId,
}) {
	const handleChange = (event) => {
		updateNote(event.target.value);
	};

	return (
		<div className="editor-window-content">
			<textarea
				className="note-editor"
				ref={noteContentRef}
				disabled={disabled}
				value={
					selectedNoteIndex !== -1 ? notes[selectedNoteIndex]?.text ?? '' : ''
				}
				onChange={handleChange}
			/>
			<div className="tags-area">
				<TagArea
					tags={tags}
					handleDelete={handleDelete}
					handleAddition={handleAddition}
					handleDrag={handleDrag}
					handleTagClick={handleTagClick}
				/>
			</div>
		</div>
	);
}

export default EditorWindowContent;
