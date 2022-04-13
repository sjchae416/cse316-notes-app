const defaultHeaders = {
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

// More on the fetch method: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
export const getNotesAPIMethod = () => {
  return fetch(`/api/notes`, {
    ...defaultHeaders,
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

export const updateNoteAPIMethod = (notes) => {
  return fetch(`/api/notes/${notes._id}`, {
    ...defaultHeaders,
    method: 'PUT', // The method defaults to GET
    body: JSON.stringify(notes),
  })
    .then(checkStatus)
    .then(parseJSON);
};

export const createNoteAPIMethod = (notes) => {
  return fetch(`/api/notes`, {
    ...defaultHeaders,
    method: 'POST', // The method defaults to GET
    body: JSON.stringify(notes),
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
