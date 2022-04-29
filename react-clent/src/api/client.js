const defaultHeaders = {
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
	},
};

// SECTION get all notes
// get all notes
export const getNotesAPIMethod = () => {
	return fetch(`/api/notes`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// SECTION create new note
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

// export const getNoteByIdAPIMethod = (noteId) => {
// 	return fetch(`/api/notes/${noteId}`, {
// 		...defaultHeaders,
// 	})
// 		.then(checkStatus)
// 		.then(parseJSON);
// };

// SECTION update a note
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

// SECTION delete a note
// delete a note
export const deleteNoteAPIMethod = (noteId) => {
	return fetch(`/api/notes/${noteId}`, {
		...defaultHeaders,
		method: 'DELETE',
	})
		.then(checkStatus)
		.then(parseJSON);
};

// SECTION get a user
// get a user bu id
export const getUserByIdAPIMethod = () => {
	return fetch(`/api/users/loggedInUser`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// SECTION update a user
export const updateUserAPIMethod = (user) => {
	return fetch(`/api/users/${user._id}`, {
		...defaultHeaders,
		method: 'PUT',
		body: JSON.stringify(user),
	})
		.then(checkStatus)
		.then();
};

// SECTION signup user
export const signUpUserAPIMethod = (user) => {
	return fetch('/api/signup', {
		...defaultHeaders,
		method: 'POST',
		body: JSON.stringify(user),
	})
		.then(checkStatus)
		.then(parseJSON);
};

// SECTION login user
export const loginUserAPIMethod = (user) => {
	return fetch('/api/login', {
		...defaultHeaders,
		method: 'POST',
		body: JSON.stringify(user),
	})
		.then(checkStatus)
		.then(parseJSON);
};

// SECTION logout user
export const logoutUserAPIMethod = (user) => {
	return fetch('/api/logout', {
		...defaultHeaders,
		method: 'POST',
		body: JSON.stringify(user),
	}).then(checkStatus);
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
