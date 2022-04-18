// 1. 노트 추가 시 500 에러
// 2. 노트 삭제 시 db에서 지워지지만 front에서 새로고침을 해야함
// 3. tag 인식 못함(노트에 추가 안한듯) failed prop type
// 5. 첫 검색 성공 후 지울 때 인식 못함
// 6. 프로필 정보 저장 및 불러오기
// 8. 화면 줄어들고 노트 수정하고 다시 돌아가면 에러
// 7. 노트 선택 시 색깔 주기

import React, { useState, useEffect, useRef } from 'react';
import SidebarNav from './components/SidebarNav';
import SidebarContent from './components/SidebarContent';
import EditorWindowNav from './components/EditorWindowNav';
import EditorWindowContent from './components/EditorWindowContent';
import ProfilePage from './components/ProfilePage';
import {
	createNoteAPIMethod,
	deleteNoteAPIMethod,
	getNotesAPIMethod,
	updateNoteAPIMethod,
} from './api/client';
import useDebounce from './hooks/useDebounce';

function App() {
	const [notes, setNotes] = useState([]);
	console.log('🚀 ~ file: App.js ~ line 25 ~ App ~ notes', notes);

	const [profile, setProfile] = useState({
		name: '',
		email: '',
		colorScheme: '',
	});
	const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);
	const [selectedNoteId, setSelectedNoteId] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [isNoteDisabled, setIsNoteDisabled] = useState(false);
	const [isInit, setIsInit] = useState(true);
	const [isNarrowScreen, setIsNarrowScreen] = useState(
		() => window.innerWidth <= 500
	);
	const [isSidebarWhenNarrowScreen, setIsSidebarWhenNarrowScreen] =
		useState(false);
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
	const noteContentRef = useRef(null);
	const debounceUpdating = useDebounce(
		selectedNoteIndex === -1 ? '' : notes[selectedNoteIndex].text,
		1000
	);

	const profileContainerRef = useRef(null);
	const profileCloseButtonRef = useRef(null);

	// useEffect(() => {
	// 	// actual update
	// 	if (selectedNoteIndex !== -1) {
	// 		updateNoteAPIMethod(notes[selectedNoteIndex]);
	// 	}
	// }, [debounceUpdating]);

	useEffect(() => {
		// same as componentDidMount
		const fetchData = async () => {
			const data = await getNotesAPIMethod();
			console.log('🚀 ~ file: App.js ~ line 54 ~ fetchData ~ data', data);
			setNotes(data);
		};

		setIsInit(false);

		fetchData();

		const onResize = () => {
			if (window.innerWidth <= 500) {
				setIsNarrowScreen(true);
			} else {
				setIsSidebarWhenNarrowScreen(false);
				setIsNarrowScreen(false);
			}
		};

		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	useEffect(() => {
		if (notes.length === 0 || isInit) {
			setSelectedNoteId('');
			setSelectedNoteIndex(-1);
			setIsNoteDisabled(true);
		} else if (!isEditing) {
			// setSelectedNoteId(notes[notes.length - 1].id);
			setIsNoteDisabled(false);
		}
	}, [notes]);

	useEffect(() => {
		if (selectedNoteId) {
			for (let i = 0; i < notes.length; i++) {
				if (notes[i].id === selectedNoteId) {
					setSelectedNoteIndex(i);
					noteContentRef.current.focus();
					break;
				}
			}
		} else {
			setSelectedNoteIndex(-1);
		}
	}, [selectedNoteId]);

	useEffect(() => {
		console.log('----- useEffect([selectedNoteIndex]) -----');
		console.log(
			'🚀 ~ file: App.js ~ line 131 ~ useEffect ~ notes[selectedNoteIndex]',
			notes[selectedNoteIndex]
		);
		console.log(
			'🚀 ~ file: App.js ~ line 131 ~ useEffect ~ selectedNoteIndex',
			selectedNoteIndex
		);
	}, [selectedNoteIndex]);

	useEffect(() => {
		const notesCopy = [...notes];
		if (searchInput === '') {
			setNotes(notesCopy);
		} else {
			const searchedNotes = [...notes].filter((obj) =>
				Object.values(obj).some((val) => val.includes(searchInput))
			);
			console.log(
				'🚀 ~ file: App.js ~ line 124 ~ useEffect ~ searchInput',
				searchInput
			);
			setNotes(searchedNotes);
		}
	}, [searchInput]);

	// create new note
	const addNote = async () => {
		setSearchInput('');
		setIsEditing(false);
		const newNote = {
			text: '',
			lastUpdatedDate: new Date(),
			tags: [],
		};

		await createNoteAPIMethod(newNote, (response) => {
			setNotes([...notes, response]);
		});
	};

	// update a note
	const updateNote = (text) => {
		// const lastUpdatedDate = new Date();
		const editedNotes = [...notes];
		const editedNote = {
			...notes[selectedNoteIndex],
			text,
			lastUpdatedDate: new Date(),
			// tags: notes[selectedNoteIndex].tags,
		};
		editedNotes[selectedNoteIndex] = editedNote;

		setNotes(editedNotes);
	};

	// delete a note
	const deleteNote = async (id) => {
		await deleteNoteAPIMethod(id, (response) => {
			console.log(response);
		});
		setIsEditing(false);
		getNotesAPIMethod().then((response) => {
			if (notes.length == 0) {
				// setSelectedNoteIndex('');
				setSelectedNoteIndex(-1);
			} else {
				setSelectedNoteIndex(notes[notes.length - 1].id);
			}
			setNotes(response);
		});
	};

	// search notes
	// const searchNotes = (text) => {
	// 	setSearchInput(text);
	// 	console.log('🚀 ~ file: App.js ~ line 162 ~ searchNotes ~ text', text);
	// 	const searchedNotes = [...notes].filter((obj) =>
	// 		Object.values(obj).some((val) => val.includes(text))
	// 	);
	// 	console.log(notes);
	// 	setNotes(searchedNotes);
	// };
	const searchNotes = (text) => {
		setSearchInput(text);
	};

	const handleProfileName = (text) => {
		const newProfile = {
			...profile,
			name: text,
		};
		setProfile(newProfile);
	};
	const handleProfileEmail = (text) => {
		const newProfile = {
			...profile,
			email: text,
		};
		setProfile(newProfile);
	};
	const handleProfileColorScheme = (text) => {
		const newProfile = {
			...profile,
			colorScheme: text,
		};
		setProfile(newProfile);
	};

	const handleTagDelete = (i) => {
		setIsEditing(true);
		const modifiedTags = [...notes[selectedNoteIndex].tags];
		modifiedTags.splice(i, 1);
		const untaggedNotes = [...notes];
		const untaggedNote = { ...notes[selectedNoteIndex], tags: modifiedTags };
		untaggedNotes[selectedNoteIndex] = untaggedNote;
		setNotes(untaggedNotes);
	};

	const handleTagAdd = (newTag) => {
		setIsEditing(true);
		const newTags = [...notes[selectedNoteIndex].tags, newTag];
		const taggedNotes = [...notes];
		const taggedNote = { ...notes[selectedNoteIndex], tags: newTags };
		taggedNotes[selectedNoteIndex] = taggedNote;
		setNotes(taggedNotes);
	};

	const handleTagDrag = (tag, currPos, newPos) => {
		setIsEditing(true);
		const newTags = notes[selectedNoteIndex].tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		const taggedNotes = [...notes];
		const taggedNote = { ...notes[selectedNoteIndex], tags: newTags };
		taggedNotes[selectedNoteIndex] = taggedNote;

		setNotes(taggedNotes);
	};

	const handleTagClick = (index) => {
		console.log(`The tag at index ${index} was clicked`);
	};

	const handleBackArrowClick = () => {
		setIsSidebarWhenNarrowScreen(true);
	};

	const handleSaveClick = (e) => {
		e.preventDefault();
	};

	const openProfileModal = (e) => {
		e.stopPropagation();
		setIsProfileModalOpen(true);
	};
	const closeProfileModal = (e) => {
		setIsProfileModalOpen(false);
	};

	const judgeIsProfileContainer = (e) => {
		const pcr = profileContainerRef.current;
		let target = e.target;
		while (pcr !== target) {
			if (e.target === profileCloseButtonRef.current) {
				return;
			}
			target = target.parentElement;
			if (target === document.body) {
				setIsProfileModalOpen(false);
				return;
			}
		}
		setIsProfileModalOpen(true);
	};

	return (
		<div className="container" onClick={judgeIsProfileContainer}>
			{((isNarrowScreen && isSidebarWhenNarrowScreen) || !isNarrowScreen) && (
				<div
					className="sidebar"
					style={{ width: isNarrowScreen ? '100%' : 240 }}
				>
					<SidebarNav
						notes={notes}
						handleAddNote={addNote}
						openProfileModal={openProfileModal}
					/>
					<SidebarContent
						notes={notes}
						selectedNoteId={selectedNoteId}
						stateSetSelectedNoteId={setSelectedNoteId}
						setNoteContentDisabled={setIsNoteDisabled}
						noteContentRef={noteContentRef}
						setIsSidebarWhenNarrowScreen={setIsSidebarWhenNarrowScreen}
						searchInput={searchInput}
						setSearchInput={setSearchInput}
						searchNotes={searchNotes}
					/>
				</div>
			)}

			{(!isNarrowScreen || !isSidebarWhenNarrowScreen) && (
				<div className="editor-window">
					<EditorWindowNav
						notes={notes}
						handleDeleteNote={deleteNote}
						selectedNoteId={selectedNoteId}
						handleBackArrowClick={handleBackArrowClick}
						isNarrowScreen={isNarrowScreen}
					/>
					<EditorWindowContent
						notes={notes}
						updateNote={updateNote}
						selectedNoteIndex={selectedNoteIndex}
						setIsEditing={setIsEditing}
						disabled={isNoteDisabled}
						noteContentRef={noteContentRef}
						tags={
							selectedNoteIndex !== -1 ? notes[selectedNoteIndex]?.tags : []
						}
						handleDelete={handleTagDelete}
						handleAddition={handleTagAdd}
						handleDrag={handleTagDrag}
						handleTagClick={handleTagClick}
					/>
				</div>
			)}
			<div
				tabIndex="0"
				style={{
					width: isNarrowScreen ? '100%' : '40%',
					height: isNarrowScreen ? '100%' : '70%',
					display: isProfileModalOpen ? 'block' : 'none',
				}}
				className="profile-page"
				ref={profileContainerRef}
			>
				<ProfilePage
					handleProfileName={handleProfileName}
					handleProfileEmail={handleProfileEmail}
					handleProfileColorScheme={handleProfileColorScheme}
					handleSaveClick={handleSaveClick}
					profile={profile}
					handleClose={closeProfileModal}
					isNarrowScreen={isNarrowScreen}
					closeButtonRef={profileCloseButtonRef}
				/>
			</div>
		</div>
	);
}

export default App;
