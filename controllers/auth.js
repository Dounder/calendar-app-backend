const { response } = require('express');
const User = require('../models/users/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const register = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) return res.status(400).json({ ok: false, msg: 'User already exists' });

		user = new User(req.body);

		// Hash the password before saving
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		// Create a token
		const token = await generateJWT(user._id, user.name);

		res.status(201).json({ ok: true, user: { _id: user._id, name: user.name }, token });
	} catch (error) {
		res.status(500).json({ ok: false, msg: 'Error' });
	}
};

const login = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (!user) return res.status(400).json({ ok: false, msg: "User doesn't exits" });

		// Compare the password with the hash
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) return res.status(400).json({ ok: false, msg: 'Invalid password' });

		// Create a token
		const token = await generateJWT(user._id, user.name);

		res.status(201).json({ ok: true, user: { _id: user._id, name: user.name }, token });
	} catch (error) {
		res.status(500).json({ ok: false, msg: 'Error' });
	}
};

const renewToken = async (req, res = response) => {
	const { uid, name } = req;

	const token = await generateJWT(uid, name);

	res.json({ ok: true, msg: 'New token generated', token });
};

module.exports = { register, login, renewToken };
