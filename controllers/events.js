const { response } = require('express');
const Event = require('../models/events/Event');

const getEvent = async (req, res = response) => {
	const events = await Event.find().populate('user', 'name email');

	res.json({ ok: true, events });
};

const createEvent = async (req, res = response) => {
	const event = new Event(req.body);
	const { uid } = req;

	try {
		event.user = uid;
		const savedEvent = await event.save();

		res.status(201).json({ ok: true, msg: 'Event created', event: savedEvent });
	} catch (error) {
		res.status(500).json({ ok: false, msg: 'Error when creating event' });
	}
};

const updateEvent = async (req, res = response) => {
	const eventId = req.params.id;
	const uid = req.uid;

	try {
		const event = await Event.findById(eventId);

		if (!event) return res.status(404).json({ ok: false, msg: 'Event not found' });

		if (event.user.toString() !== uid)
			return res
				.status(401)
				.json({ ok: false, msg: "You don't have permision for this action" });

		const newEvent = { ...req.body, user: uid };

		const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

		res.json({ ok: true, msg: 'Event updated', event: updateEvent });
	} catch (error) {
		res.status(500).json({ ok: false, msg: 'Error when updating event' });
	}
};

const deleteEvent = async (req, res = response) => {
	const eventId = req.params.id;
	const uid = req.uid;

	try {
		const event = await Event.findById(eventId);

		if (!event) return res.status(404).json({ ok: false, msg: 'Event not found' });

		if (event.user.toString() !== uid)
			return res
				.status(401)
				.json({ ok: false, msg: "You don't have permision for this action" });

		await Event.findByIdAndDelete(eventId);

		res.json({ ok: true, msg: 'Event deleted' });
	} catch (error) {
		res.status(500).json({ ok: false, msg: 'Error when deleting event' });
	}
};

module.exports = { getEvent, createEvent, updateEvent, deleteEvent };
