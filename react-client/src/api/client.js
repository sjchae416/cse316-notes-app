const defaultHeaders = {
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
	},
};

// ANCHOR get all notes
export const getNotesAPIMethod = () => {
	return fetch(`/api/notes`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// ANCHOR create new note
export const createNoteAPIMethod = (note) => {
	return fetch('/api/notes', {
		...defaultHeaders,
		method: 'POST',
		body: JSON.stringify(note),
	})
		.then(checkStatus)
		.then(parseJSON);
};

// ANCHOR update a note
export const updateNoteAPIMethod = (note) => {
	return fetch(`/api/notes/${note._id}`, {
		...defaultHeaders,
		method: 'PUT',
		body: JSON.stringify(note),
	})
		.then(checkStatus)
		.then();
};

// ANCHOR delete a note
export const deleteNoteAPIMethod = (noteId) => {
	return fetch(`/api/notes/${noteId}`, {
		...defaultHeaders,
		method: 'DELETE',
	})
		.then(checkStatus)
		.then(parseJSON);
};

// ANCHOR get a user
export const getUserByIdAPIMethod = () => {
	return fetch(`/api/users/loggedInUser`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// ANCHOR update a user
export const updateUserAPIMethod = (user) => {
	return fetch(`/api/users`, {
		...defaultHeaders,
		method: 'PUT',
		body: JSON.stringify(user),
	})
		.then(checkStatus)
		.then();
};

// ANCHOR signup user
export const signUpUserAPIMethod = (user) => {
	return fetch('/api/signup', {
		...defaultHeaders,
		method: 'POST',
		body: JSON.stringify(user),
	})
		.then(checkStatus)
		.then(parseJSON);
};

// ANCHOR login user
export const loginUserAPIMethod = (user) => {
	return fetch('/api/login', {
		...defaultHeaders,
		method: 'POST',
		body: JSON.stringify(user),
	})
		.then(checkStatus)
		.then(parseJSON);
};

// ANCHOR logout user
export const logoutUserAPIMethod = () => {
	return fetch('/api/logout', {
		...defaultHeaders,
		method: 'POST',
	}).then(checkStatus);
};

// ANCHOR upload an image to Cloudinary
export const uploadImageToCloudinaryAPIMethod = (formData) => {
	const cloudName = 'sjchae-cloud';
	return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
		method: 'POST',
		body: formData,
	})
		.then(checkStatus)
		.then(parseJSON);
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
