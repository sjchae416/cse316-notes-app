const defaultHeaders = {
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
	},
};

// More on the fetch method: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// get all notes
export const getNotesAPIMethod = () => {
	return fetch(`/api/notes`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// create new note
export const createNoteAPIMethod = (note) => {
	return fetch('/api/notes', {
		...defaultHeaders,
		method: 'POST',
		body: JSON.stringify(note),
	})
		.then(checkStatus)
		.then(parseJSON);
};

export const getNoteByIdAPIMethod = (noteId) => {
	return fetch(`/api/notes/${noteId}`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// update a note
export const updateNoteAPIMethod = (note) => {
	return fetch(`/api/notes/${note._id}`, {
		...defaultHeaders,
		method: 'PUT',
		body: JSON.stringify(note),
	})
		.then(checkStatus)
		.then();
};

// delete a note
export const deleteNoteAPIMethod = (noteId) => {
	return fetch(`/api/notes/${noteId}`, {
		...defaultHeaders,
		method: 'DELETE',
	})
		.then(checkStatus)
		.then(parseJSON);
};

// get user
export const getUserAPIMethod = () => {
	return fetch(`/api/users`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// update a user
export const updateUserAPIMethod = (user) => {
	return fetch(`/api/users/${user._id}`, {
		...defaultHeaders,
		method: 'PUT',
		body: JSON.stringify(user),
	})
		.then(checkStatus)
		.then();
};

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const error = new Error(`HTTP Error: ${response.statusText}`);
		error.status = response.statusText;
		error.response = response;
		console.log(error);
		throw error;
	}
}

function parseJSON(response) {
	return response.json();
}
