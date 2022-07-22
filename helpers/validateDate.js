const moment = require('moment');

const validateDate = (value, { req, location, path }) => {
	if (!value) return false;

	const date = moment(value);

	return date.isValid();
};

module.exports = { validateDate };
