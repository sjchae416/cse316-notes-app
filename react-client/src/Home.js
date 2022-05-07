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
	updateUserAPIMethod,
} from './api/client';
import useDebounce from './hooks/useDebounce';
import { determineRelatednessOfSentences } from './universalSentenceEncoder';
import { getIdToIndex } from './utils';

function Home({ profile, setProfile, setIsLoginPage }) {
	const [notes, setNotes] = useState([]);
	const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);
	const [selectedNoteId, setSelectedNoteId] = useState(-1);
	const [searchInput, setSearchInput] = useState('');
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
	const noteContentRef = useRef(null);
	const [noteTextValue, setNoteTextValue] = useState('');
	const debounceValue = useDebounce(noteTextValue, 1000);
	const [wasEdited, setWasEdited] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [searchedNotes, setSearchedNotes] = useState(undefined);
	const profileContainerRef = useRef(null);
	const profileCloseButtonRef = useRef(null);
	const searchBarInputRef = useRef(null);
	const saveButtonRef = useRef(null);
	const imageUploadButtonRef = useRef(null);
	const [isNarrowScreen, setIsNarrowScreen] = useState(
		() => window.innerWidth <= 500
	);
	const [isSidebarWhenNarrowScreen, setIsSidebarWhenNarrowScreen] =
		useState(false);

	const [similarNotes, setSimilarNotes] = useState([]);
	const [wasCreatedRecord, setWasCreatedRecord] = useState(0);
	const [wasDeletedTrack, setWasDeletedTrack] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			if (profile) {
				const data = await getNotesAPIMethod();
				const willBeMountedNotes = data.map((note) => {
					return {
						...note,
						lastUpdatedDate: new Date(note.lastUpdatedDate),
					};
				});
				setNotes(willBeMountedNotes);
			}
		};
		fetchData();
	}, [profile]);

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

	useEffect(() => {
		const fetchSimilarNotes = async () => {
			if (!isUpdating && selectedNoteId !== -1) {
				const notesText = notes.map((note) => note.text);
				const comparedIndex = getIdToIndex(notes, selectedNoteId);
				console.log('compared', comparedIndex);
				const result = await determineRelatednessOfSentences(
					notesText,
					comparedIndex === -1 ? 0 : comparedIndex
				);
				setSimilarNotes(result);
				console.log(result);
			}
		};
		fetchSimilarNotes();
		if (isUpdating) {
			setSimilarNotes([]);
		}
	}, [selectedNoteId, isUpdating]);

	useEffect(() => {
		const fetchSimilarNotes = async () => {
			if (wasCreatedRecord || wasDeletedTrack) {
				const notesText = notes.map((note) => note.text);
				const comparedIndex = getIdToIndex(notes, selectedNoteId);
				console.log('compared', comparedIndex);
				const result = await determineRelatednessOfSentences(
					notesText,
					comparedIndex === -1 ? 0 : comparedIndex
				);
				setSimilarNotes(result);
				console.log(result);
			}
		};
		fetchSimilarNotes();
	}, [wasCreatedRecord, wasDeletedTrack]);

	useEffect(() => {
		if (searchInput === '') {
			setSearchedNotes(undefined);
		} else {
			const searched = [...notes].filter((obj) => {
				return obj.text.includes(searchInput);
			});

			setSearchedNotes(searched);
		}
	}, [searchInput]);

	useEffect(() => {
		setSelectedNoteId(notes[selectedNoteIndex]?._id || -1);
		console.log(
			'selectedNoteId after selected: ',
			notes[selectedNoteIndex]?._id
		);
	}, [selectedNoteIndex]);

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
		setWasCreatedRecord((prevRecord) => prevRecord + 1);
		setSelectedNoteIndex(0);
		if (selectedNoteIndex !== -1) {
			setTimeout(() => {
				noteContentRef.current.focus();
			}, 50);
		}
	};

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
		setWasDeletedTrack((prevRecord) => prevRecord + 1);
	};

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
			if (e.target === imageUploadButtonRef.current) {
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
						profile={profile}
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
						similarNotes={similarNotes}
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
				{profile && (
					<ProfilePage
						handleProfileName={handleProfileName}
						handleProfileEmail={handleProfileEmail}
						handleProfileColorScheme={handleProfileColorScheme}
						handleSaveClick={handleSaveClick}
						handleClose={closeProfileModal}
						isNarrowScreen={isNarrowScreen}
						closeButtonRef={profileCloseButtonRef}
						saveButtonRef={saveButtonRef}
						profile={profile}
						setProfile={setProfile}
						setIsLoginPage={setIsLoginPage}
						imageUploadButtonRef={imageUploadButtonRef}
					/>
				)}
			</div>
		</div>
	);
}

export default Home;
