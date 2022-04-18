// 1. 첫 검색 성공 후 지울 때 인식 못함
// 2. 프로필 정보 저장 및 불러오기
// 3. 화면 줄어들고 노트 수정하고 다시 돌아가면 에러
// 4. 노트 선택 시 색깔 주기

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

	const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);

	const [searchInput, setSearchInput] = useState('');
	const [isNarrowScreen, setIsNarrowScreen] = useState(
		() => window.innerWidth <= 500
	);
	const [isSidebarWhenNarrowScreen, setIsSidebarWhenNarrowScreen] =
		useState(false);
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
	const noteContentRef = useRef(null);
	const [noteTextValue, setNoteTextValue] = useState('');
	const debounceValue = useDebounce(noteTextValue, 1000);
	const [selectedNoteId, setSelectedNoteId] = useState(-1);
	const [wasEdited, setWasEdited] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);

	const [profile, setProfile] = useState({
		name: '',
		email: '',
		colorScheme: '',
	});

	const profileContainerRef = useRef(null);
	const profileCloseButtonRef = useRef(null);

	// fetching Notes Data
	useEffect(() => {
		// same as componentDidMount
		const fetchData = async () => {
			const data = await getNotesAPIMethod();
			const willBeMountedNotes = data.map((note) => {
				return {
					...note,
					lastUpdatedDate: new Date(note.lastUpdatedDate),
				};
			});
			setNotes(willBeMountedNotes);
		};

		fetchData();
	}, []);

	// resizing windows
	useEffect(() => {
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
	// same as componentDidMount

	// changing text contents
	useEffect(() => {
		if (selectedNoteIndex !== -1) {
			setNoteTextValue(notes[selectedNoteIndex]);
		}
	}, [selectedNoteIndex, notes]);

	useEffect(() => {
		const updateData = async () => {
			if (notes && selectedNoteIndex !== -1 && isUpdating) {
				await updateNoteAPIMethod(notes[selectedNoteIndex]);
				setIsUpdating(false);
			}
		};
		updateData();
	}, [debounceValue]);

	useEffect(() => {
		if (wasEdited) {
			for (let i = 0; i < notes.length; i++) {
				if (notes[i]._id === selectedNoteId) {
					setSelectedNoteIndex(i);
				}
			}
			setWasEdited(false);
		}
	}, [wasEdited]);

	// useEffect(() => {

	// 	await updateNoteAPIMethod(editedNote);
	// 	const fetchedNotes = await getNotesAPIMethod();
	// },[notes])

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

	useEffect(() => {
		setSelectedNoteId(notes[selectedNoteIndex]?._id || -1);
	}, [selectedNoteIndex]);

	// create new note
	const addNote = async () => {
		setSearchInput('');

		const now = new Date();
		const newNote = {
			text: '',
			lastUpdatedDate: now,
			tags: [],
		};

		await createNoteAPIMethod(newNote);
		const fetchedNotes = await getNotesAPIMethod();
		setNotes(
			fetchedNotes.map((note) => {
				return {
					...note,
					lastUpdatedDate: new Date(note.lastUpdatedDate),
				};
			})
		);
		setSelectedNoteIndex(0);
		if (selectedNoteIndex !== -1) {
			setTimeout(() => {
				noteContentRef.current.focus();
			}, 50);
		}
	};

	// update a note
	const updateNote = (text) => {
		const lastUpdatedDate = new Date();
		const editedNotes = [...notes];
		const editedNote = {
			...notes[selectedNoteIndex],
			text,
			lastUpdatedDate,
		};
		editedNotes[selectedNoteIndex] = editedNote;

		setNotes(editedNotes);
		setWasEdited(true);
		setIsUpdating(true);
	};

	// delete a note
	const deleteNote = async () => {
		const id = notes[selectedNoteIndex]._id;
		await deleteNoteAPIMethod(id);
		// when get notes
		const fetchedNotes = await getNotesAPIMethod();

		if (fetchedNotes.length === 0) {
			setSelectedNoteIndex(-1);
		} else {
			setSelectedNoteIndex(0);
		}

		if (selectedNoteIndex !== -1) {
			setTimeout(() => {
				noteContentRef.current.focus();
			}, 50);
		}

		setNotes(
			fetchedNotes.map((note) => {
				return {
					...note,
					lastUpdatedDate: new Date(note.lastUpdatedDate),
				};
			})
		);
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

	// const searchNotes = (text) => {
	// 	setSearchInput(text);
	// };

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
		const modifiedTags = [...notes[selectedNoteIndex].tags];
		modifiedTags.splice(i, 1);
		const untaggedNotes = [...notes];
		const untaggedNote = { ...notes[selectedNoteIndex], tags: modifiedTags };
		untaggedNotes[selectedNoteIndex] = untaggedNote;
		setNotes(untaggedNotes);
		setIsUpdating(true);
	};

	const handleTagAdd = (newTag) => {
		const newTags = [...notes[selectedNoteIndex].tags, newTag];
		const taggedNotes = [...notes];
		const taggedNote = { ...notes[selectedNoteIndex], tags: newTags };
		taggedNotes[selectedNoteIndex] = taggedNote;
		setNotes(taggedNotes);
		setIsUpdating(true);
	};

	const handleTagDrag = (tag, currPos, newPos) => {
		const newTags = notes[selectedNoteIndex].tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		const taggedNotes = [...notes];
		const taggedNote = { ...notes[selectedNoteIndex], tags: newTags };
		taggedNotes[selectedNoteIndex] = taggedNote;

		setNotes(taggedNotes);
		setIsUpdating(true);
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
						setSelectedNoteIndex={setSelectedNoteIndex}
						noteContentRef={noteContentRef}
						setIsSidebarWhenNarrowScreen={setIsSidebarWhenNarrowScreen}
					/>
				</div>
			)}

			{(!isNarrowScreen || !isSidebarWhenNarrowScreen) && (
				<div className="editor-window">
					<EditorWindowNav
						handleDeleteNote={deleteNote}
						handleBackArrowClick={handleBackArrowClick}
						isNarrowScreen={isNarrowScreen}
						selectedNoteIndex={selectedNoteIndex}
					/>
					<EditorWindowContent
						notes={notes}
						updateNote={updateNote}
						selectedNoteIndex={selectedNoteIndex}
						disabled={selectedNoteIndex === -1}
						noteContentRef={noteContentRef}
						tags={
							selectedNoteIndex !== -1 ? notes[selectedNoteIndex]?.tags : []
						}
						handleDelete={handleTagDelete}
						handleAddition={handleTagAdd}
						handleDrag={handleTagDrag}
						handleTagClick={handleTagClick}
						setSelectedNoteIndex={setSelectedNoteIndex}
						selectedNoteId={selectedNoteId}
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
