export const convertDateToString = (d) => {
	return `${
		d.getMonth() + 1
	}/${d.getDate()}/${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${
		d.getHours() < 13 ? 'AM' : 'PM'
	}`;
};

export const getIdToIndex = (notes, id) => {
	for (let i = 0; i < notes.length; i++) {
		if (notes[i]._id === id) {
			return i;
		}
	}
	return -1;
};

export const getIndexToId = (notes, idx) => {
	return idx === -1 ? -1 : notes[idx]._id;
};
