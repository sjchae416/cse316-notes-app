import NotesList from './NotesList';

function SidebarContent(props) {
	const handleSearch = (event) => {
		props.searchNotes(event.target.value);
	};

	return (
		<div className="sidebar-content content">
			<div className="search-box">
				<span className="material-icons">search</span>
				<input
					className="input-search"
					type="text"
					placeholder="Search all notes"
					onChange={handleSearch}
					ref={props.searchBarInputRef}
				/>
			</div>
			<NotesList {...props} />
		</div>
	);
}

export default SidebarContent;
