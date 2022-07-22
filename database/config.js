const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION);
		console.log('DB Connected');
	} catch (error) {
		console.log(error);
		throw new Error('DB Connection Error');
	}
};

module.exports = { dbConnection };
