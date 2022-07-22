const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWt = (req, res = response, next) => {
	// x-token header
	const token = req.header('x-token');

	// Check if the token is valid
	if (!token) return res.status(401).json({ ok: false, msg: 'No token provided' });

	try {
		const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);

		req.uid = uid;
		req.name = name;
	} catch (error) {
		return res.status(401).json({ ok: false, msg: 'Invalid token' });
	}

	next();
};

module.exports = { validateJWt };
