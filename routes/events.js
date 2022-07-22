/** Auth Routes -> host + /api/events */
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateDate } = require('../helpers/validateDate');
const { fieldsValidators } = require('../middlewares/fieldsValidators');
const { validateJWt } = require('../middlewares/validateJWT');

router.use(validateJWt);

router.get('/', getEvent);

router.post(
	'/',
	[
		check('title', 'Title is requires').not().isEmpty(),
		check('start', 'Start date is requires').custom(validateDate),
		check('end', 'End date is requires').custom(validateDate),
		fieldsValidators,
	],
	createEvent
);

router.put(
	'/:id',
	[
		check('title', 'Title is requires').not().isEmpty(),
		check('start', 'Start date is requires').custom(validateDate),
		check('end', 'End date is requires').custom(validateDate),
		fieldsValidators,
	],
	updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = router;
