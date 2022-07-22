/** Auth Routes -> host + /api/auth */
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { register, login, renewToken } = require('../controllers/auth');
const { fieldsValidators } = require('../middlewares/fieldsValidators');
const { validateJWt } = require('../middlewares/validateJWT');

router.post(
	'/new',
	[
		// Middlewares
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Email is required').isEmail(),
		check('password', 'Password must be contain at least 6 characters').isLength({ min: 6 }),
		fieldsValidators,
	],
	register
);

router.post(
	'/',
	[
		check('email', 'Email is required').isEmail(),
		check('password', 'Password must be contain at least 6 characters').isLength({ min: 6 }),
		fieldsValidators,
	],
	login
);

router.get('/renew', validateJWt, renewToken);

module.exports = router;
