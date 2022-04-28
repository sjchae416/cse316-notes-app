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
	getUserAPIMethod,
	updateUserAPIMethod,
	registerUserAPIMethod,
} from './api/client';
import useDebounce from './hooks/useDebounce';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SingUpPage';

function App() {
	const [notes, setNotes] = useState([]);
	const [profile, setProfile] = useState({});
	const [user, setUser] = useState(null);

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
	const [searchedNotes, setSearchedNotes] = useState(undefined);
	// const [userName, setUserName] = useState('');
	// const [userEmail, setUserEmail] = useState('');
	// const [userPassword, setUserPassword] = useState('');

	const profileContainerRef = useRef(null);
	const profileCloseButtonRef = useRef(null);
	const searchBarInputRef = useRef(null);
	const saveButtonRef = useRef(null);

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

			const profileData = await getUserAPIMethod();
			setProfile(profileData);
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
		if (searchInput === '') {
			setSearchedNotes(undefined);
		} else {
			const searched = [...notes].filter((obj) => {
				return obj.text.includes(searchInput);
			});
			console.log(
				'🚀 ~ file: App.js ~ line 124 ~ useEffect ~ searchInput',
				searchInput
			);
			setSearchedNotes(searched);
		}
	}, [searchInput]);

	useEffect(() => {
		setSelectedNoteId(notes[selectedNoteIndex]?._id || -1);
	}, [selectedNoteIndex]);

	// create new note
	const addNote = async () => {
		setSearchInput('');
		if (searchBarInputRef?.current) {
			searchBarInputRef.current.value = '';
		}

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

	const handleSaveClick = async (e) => {
		e.preventDefault();
		console.log(profile);
		await updateUserAPIMethod(profile);
		closeProfileModal();
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
			if (e.target === saveButtonRef.current) {
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

	// const handleRegister = async () => {
	// 	await registerUserAPIMethod({
	// 		name: userName,
	// 		email: userEmail,
	// 		password: userPassword,
	// 	});
	// };

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
						searchNotes={searchNotes}
						searchedNotes={searchedNotes}
						searchBarInputRef={searchBarInputRef}
						selectedNoteIndex={selectedNoteIndex}
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
					saveButtonRef={saveButtonRef}
				/>
			</div>
			<LoginPage />
			<SignUpPage
				// user={user}
				// setUser={setUser}
				// setUserName={setUserName}
				// setUserEmail={setUserEmail}
				// setUserPassword={setUserPassword}
				// handleRegister={handleRegister}
			/>
		</div>
	);
}

export default App;
