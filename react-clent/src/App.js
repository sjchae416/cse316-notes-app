import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SidebarNav from './components/SidebarNav';
import SidebarContent from './components/SidebarContent';
import EditorWindowNav from './components/EditorWindowNav';
import EditorWindowContent from './components/EditorWindowContent';
import ProfilePage from './components/ProfilePage';
import {
	createNoteAPIMethod,
	deleteNoteAPIMethod,
	getNotesAPIMethod,
} from './api/client';

function App() {
	const [notes, setNotes] = useState([]);

	const [profile, setProfile] = useState({
		name: '',
		email: '',
		colorScheme: '',
	});

	const [selectedNoteId, setSelectedNoteId] = useState('');
	const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);
	const [isEditing, setIsEditing] = useState(false);
	const [isNoteDisabled, setIsNoteDisabled] = useState(false);
	const [isInit, setIsInit] = useState(true);
	const [isNarrowScreen, setIsNarrowScreen] = useState(
		() => window.innerWidth <= 500
	);
	const [isSidebarWhenNarrowScreen, setIsSidebarWhenNarrowScreen] =
		useState(false);
	// const [inputName, setInputName] = useState('');
	// const [inputEmail, setInputEmail] = useState('');
	// const [inputColorScheme, setInputColorScheme] = useState('');
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

	const noteContentRef = useRef(null);

	// useEffect(() => {
	//   function fetchData() {
	//     getNotesAPIMethod()
	//       .then((notes) => {
	//         console.log(notes);
	//         //retreiving all notes
	//         setNotes(notes);
	//         // console.dir(notes);
	//       })
	//       .catch((err) => {
	//         console.error('Error retrieving note data: ' + err);
	//       });
	//   }
	//   fetchData();
	// }, [setNotes]);

	useEffect(() => {
		if (notes.length === 0 || isInit) {
			setSelectedNoteId('');
			setSelectedNoteIndex(-1);
			setIsNoteDisabled(true);
		} else if (!isEditing) {
			setSelectedNoteId(notes[notes.length - 1].id);
			setIsNoteDisabled(false);
		}

		// localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes]);

  // same as componentDidMount
  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/api/notes');
    const fetchedNote = await res.json();
    // console.log(fetchedNote);
    setNotes(fetchedNote);
  };
	useEffect(() => {

		setIsInit(false);
		const onResize = () => {
			if (window.innerWidth <= 500) {
				setIsNarrowScreen(true);
			} else {
				setIsSidebarWhenNarrowScreen(false);
				setIsNarrowScreen(false);
			}
		};
		window.addEventListener('resize', onResize);
		fetchData();
		return () => window.removeEventListener('resize', onResize);
	}, []);

	useEffect(() => {
		// console.log(`useEffect: selectedNoteId          ${selectedNoteId}`);
		if (selectedNoteId) {
			for (let i = 0; i < notes.length; i++) {
				// console.log('notes[i].id:     ' + notes[i].id);
				if (notes[i].id === selectedNoteId) {
					// console.log(`i would be ${i}`);
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
		console.log('---------------this is selected Note--------');
		console.log(notes[selectedNoteIndex]);
		console.log(
			'🚀 ~ file: App.js ~ line  ~ useEffect ~ selectedNoteId',
			selectedNoteId
		);
	}, [selectedNoteIndex]);

	const addNote = () => {
		setIsEditing(false);
		const date = new Date();
		const newNote = {
			text: '',
			lastUpdatedDate: date.toLocaleString(),
			tags: [],
		};

		createNoteAPIMethod(newNote, (response) => {
			setNotes([...notes, response]);
		});
		console.log(notes);
	};

	// const getInputName = (text) => {
	//   setInputName(text);
	// };
	// const getInputEmail = (text) => {
	//   setInputEmail(text);
	// };
	// const getInputColorScheme = (text) => {
	//   setInputColorScheme(text);
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

	// const getId = (onClickId) => {
	//   // console.log("e=         " + e);
	//   // console.log("e.target=         " + e.target);
	//   // console.log("e.target.id=         " + e.target.id);
	//   // console.log("e.currentTarget.id=         " + e.currentTarget.id);
	//   setSelectedNoteId(onClickId);
	//   console.log('onClickId=         ' + onClickId);
	//   console.log('selectedNoteId=         ' + selectedNoteId + '\n');
	// }

	const updateNote = (text) => {
		console.log('now text-----------------');
		console.log(notes[selectedNoteIndex].text);
		const date = new Date();
		const editedNotes = [...notes];
		const editedNote = {
			...notes[selectedNoteIndex],
			text,
			lastUpdatedDate: date.toLocaleString(),
		};
		editedNotes[selectedNoteIndex] = editedNote;

		setNotes(editedNotes);
	};

	const deleteNote = (id) => {
		console.log('🚀 ~ file: App.js ~ line 187 ~ deleteNote ~ id', id);
		deleteNoteAPIMethod(id, (response) => {
			console.log(response);
		});
		setIsEditing(false);
		getNotesAPIMethod().then((response) => {
			setNotes(response);
		});
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
		// localStorage.setItem('profile', JSON.stringify(profile));
	};

	const openProfileModal = (e) => {
		e.stopPropagation();
		setIsProfileModalOpen(true);
	};
	const closeProfileModal = () => {
		setIsProfileModalOpen(false);
	};

	return (
		<div className="container" onClick={closeProfileModal}>
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
						handleAddNote={addNote}
						stateSetSelectedNoteId={setSelectedNoteId}
						setNoteContentDisabled={setIsNoteDisabled}
						noteContentRef={noteContentRef}
						setIsSidebarWhenNarrowScreen={setIsSidebarWhenNarrowScreen}
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
				// ref={profileContainerRef}
				// onBlur={closeProfileModal}
			>
				<ProfilePage
					handleProfileName={handleProfileName}
					handleProfileEmail={handleProfileEmail}
					handleProfileColorScheme={handleProfileColorScheme}
					handleSaveClick={handleSaveClick}
					profile={profile}
					handleClose={closeProfileModal}
					isNarrowScreen={isNarrowScreen}
				/>
			</div>
		</div>
	);
}

export default App;
